import { Injectable } from '@nestjs/common';
import { UserRole } from '../../constants/enums';
import { BusinessException } from '../../exceptions/business.exception';
import { CreateInsuranceDto, UpdateInsuranceDto } from './insurance.dto';
import { InsuranceRepository } from './insurance.repository';
import { assertClaimable, validatePolicyDates } from './insurance.validator';

@Injectable()
export class InsuranceService {
  constructor(private readonly repo: InsuranceRepository) {}

  list(user: { sub: string; role: UserRole }, petId?: string) {
    return this.repo.findMany(user, petId);
  }

  create(dto: CreateInsuranceDto) {
    validatePolicyDates(dto.startDate, dto.endDate);
    return this.repo.create({ ...dto, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate) });
  }

  /**
   * 提交理赔闭环：
   * 1. 仅宠物主人角色可发起，管理员/兽医一律拒绝；
   * 2. 保单必须属于当前用户名下的宠物；
   * 3. 仅生效/待续保且未到期的保单可理赔，已过期或理赔中失败且不改状态；
   * 4. 通过条件更新保证并发/重复提交只完成一次状态迁移，
   *    后续请求回读同一“理赔中”结果并返回失败原因。
   */
  async claim(id: string, user: { sub: string; role: UserRole }) {
    if (user.role !== UserRole.PET_OWNER) {
      throw new BusinessException('仅保单所属宠物主人可提交理赔', 40301);
    }
    const policy = await this.repo.findByIdWithPet(id);
    if (!policy || policy.pet.ownerId !== user.sub) {
      throw new BusinessException('保单不存在或不属于当前用户', 40401);
    }
    assertClaimable(policy);
    const { count } = await this.repo.transitionToClaiming(id, new Date());
    if (count === 0) {
      // 并发/重复提交：另一请求已完成状态迁移，回读当前状态并给出原因
      const current = await this.repo.findByIdWithPet(id);
      if (current) assertClaimable(current);
      throw new BusinessException('保单状态已变化，请刷新后重试', 40903);
    }
    return this.repo.findByIdWithPet(id);
  }

  update(id: string, dto: UpdateInsuranceDto) {
    validatePolicyDates(dto.startDate, dto.endDate);
    return this.repo.update(id, { ...dto, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate) });
  }
}
