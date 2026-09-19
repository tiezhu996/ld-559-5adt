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

  findById(id: string) {
    return this.prisma.insurancePolicy.findUnique({ where: { id }, include: { pet: true } });
  }

  create(data: Prisma.InsurancePolicyUncheckedCreateInput) {
    return this.prisma.insurancePolicy.create({ data });
  }

  /**
   * 原子化理赔状态迁移：仅当保单处于生效/待续保且未到期时才置为理赔中。
   * 借助 updateMany 的条件匹配，重复或并发提交最多只有一个请求能完成迁移。
   */
  transitionToClaiming(id: string, now: Date) {
    return this.prisma.insurancePolicy.updateMany({
      where: {
        id,
        status: { in: [InsuranceStatus.ACTIVE, InsuranceStatus.PENDING_RENEWAL] },
        endDate: { gte: now },
      },
      data: { status: InsuranceStatus.CLAIMING },
    });
  }

  update(id: string, data: Prisma.InsurancePolicyUncheckedUpdateInput) {
    return this.prisma.insurancePolicy.update({ where: { id }, data });
  }
}
