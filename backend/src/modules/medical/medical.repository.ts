import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserRole } from '../../constants/enums';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MedicalRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(user: { sub: string; role: UserRole }, petId?: string, type?: string) {
    const where: Prisma.MedicalRecordWhereInput = {
      ...(user.role === UserRole.VET ? { vetId: user.sub } : {}),
      ...(user.role === UserRole.PET_OWNER ? { pet: { ownerId: user.sub } } : {}),
      ...(petId ? { petId } : {}),
      ...(type ? { type: type as any } : {}),
    };
    return this.prisma.medicalRecord.findMany({ where, include: { pet: true, vet: true, clinic: true }, orderBy: { visitDate: 'desc' } });
  }

  create(data: Prisma.MedicalRecordUncheckedCreateInput) {
    return this.prisma.medicalRecord.create({ data });
  }

  update(id: string, data: Prisma.MedicalRecordUncheckedUpdateInput) {
    return this.prisma.medicalRecord.update({ where: { id }, data });
  }
}
