import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InsuranceStatus, UserRole } from '../../constants/enums';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InsuranceRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(user: { sub: string; role: UserRole }, petId?: string) {
    const where: Prisma.InsurancePolicyWhereInput = {
      ...(user.role === UserRole.PET_OWNER ? { pet: { ownerId: user.sub } } : {}),
      ...(petId ? { petId } : {}),
    };
    return this.prisma.insurancePolicy.findMany({ where, include: { pet: true }, orderBy: { endDate: 'asc' } });
  }

  findByIdWithPet(id: string) {
    return this.prisma.insurancePolicy.findUnique({ where: { id }, include: { pet: true } });
  }

  create(data: Prisma.InsurancePolicyUncheckedCreateInput) {
    return this.prisma.insurancePolicy.create({ data });
  }

  update(id: string, data: Prisma.InsurancePolicyUncheckedUpdateInput) {
    return this.prisma.insurancePolicy.update({ where: { id }, data });
  }

  /**
   * 条件化状态迁移（compare-and-set）：只有仍处于“生效/待续保”且未到期的保单
   * 才会被置为“理赔中”。并发/重复提交时仅第一个请求命中（count=1），
   * 其余请求 count=0，由调用方回读当前状态并给出失败原因。
   */
  transitionToClaiming(id: string, now: Date) {
    return this.prisma.insurancePolicy.updateMany({
      where: {
        id,
        status: { in: [InsuranceStatus.ACTIVE, InsuranceStatus.PENDING_RENEWAL] },
        endDate: { gt: now },
      },
      data: { status: InsuranceStatus.CLAIMING },
    });
  }
}
