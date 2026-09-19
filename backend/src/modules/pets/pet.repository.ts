import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserRole } from '../../constants/enums';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PetRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(user: { sub: string; role: UserRole }, species?: string, q?: string) {
    const where: Prisma.PetWhereInput = {
      ...(user.role === UserRole.PET_OWNER ? { ownerId: user.sub } : {}),
      ...(species ? { species: species as Prisma.EnumPetSpeciesFilter['equals'] } : {}),
      ...(q ? { OR: [{ name: { contains: q, mode: 'insensitive' } }, { breed: { contains: q, mode: 'insensitive' } }] } : {}),
    };
    return this.prisma.pet.findMany({ where, include: { owner: true, medicalRecords: true, vaccineRecords: true, policies: true } });
  }

  findById(id: string) {
    return this.prisma.pet.findUnique({ where: { id }, include: { owner: true, medicalRecords: true, vaccineRecords: true, policies: true } });
  }

  create(data: Prisma.PetUncheckedCreateInput) {
    return this.prisma.pet.create({ data });
  }

  update(id: string, data: Prisma.PetUncheckedUpdateInput) {
    return this.prisma.pet.update({ where: { id }, data });
  }
}
