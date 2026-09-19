import { Injectable } from '@nestjs/common';
import { InsuranceStatus as PrismaInsuranceStatus } from '@prisma/client';
import { InsuranceStatus, UserRole } from '../../constants/enums';
import { BusinessException } from '../../exceptions/business.exception';
import { CreateInsuranceDto, UpdateInsuranceDto } from './insurance.dto';
import { InsuranceRepository } from './insurance.repository';
import { validatePolicyDates } from './insurance.validator';

type AuthUser = { sub: string; role: UserRole };

@Injectable()
export class InsuranceService {
  constructor(private readonly repo: InsuranceRepository) {}

  list(user: AuthUser, petId?: string) {
    return this.repo.findMany(user, petId);
  }

  create(dto: CreateInsuranceDto) {
    validatePolicyDates(dto.startDate, dto.endDate);
    return this.repo.create({ ...dto, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate) });
  }

  async claim(user: AuthUser, id: string) {
    // 仅保单所属宠物主人可发起理赔，管理员与兽医一律拒绝
    if (user.role !== UserRole.PET_OWNER) {
      throw new BusinessException('仅保单所属宠物主人可提交理赔', 40301);
    }
    const policy = await this.repo.findById(id);
    if (!policy || policy.pet.ownerId !== user.sub) {
      throw new BusinessException('保单不存在或无权操作', 40401);
    }
    this.assertClaimable(policy.status, policy.endDate);
    // 条件化原子更新：重复/并发提交只会有一个请求完成状态迁移
    const { count } = await this.repo.transitionToClaiming(id, new Date());
    if (count !== 1) {
      // 竞争失败：回读最新状态，给出与首次提交一致的结果
      const fresh = await this.repo.findById(id);
      if (!fresh) throw new BusinessException('保单不存在或无权操作', 40401);
      this.assertClaimable(fresh.status, fresh.endDate);
      throw new BusinessException('理赔提交失败，请稍后重试');
    }
    return this.repo.findById(id);
  }

  private assertClaimable(status: PrismaInsuranceStatus, endDate: Date) {
    if (status === InsuranceStatus.CLAIMING) {
      throw new BusinessException('保单正在理赔中，请勿重复提交');
    }
    if (status === InsuranceStatus.EXPIRED || endDate.getTime() < Date.now()) {
      throw new BusinessException('保单已过期，无法提交理赔');
    }
  }

  update(id: string, dto: UpdateInsuranceDto) {
    validatePolicyDates(dto.startDate, dto.endDate);
    return this.repo.update(id, { ...dto, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate) });
  }
}
