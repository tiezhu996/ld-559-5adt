import { Injectable } from '@nestjs/common';
import { UserRole, VaccineStatus } from '../../constants/enums';
import { CreateVaccineDto, UpdateVaccineDto } from './vaccine.dto';
import { VaccineRepository } from './vaccine.repository';
import { normalizeVaccineStatus } from './vaccine.validator';

@Injectable()
export class VaccineService {
  constructor(private readonly repo: VaccineRepository) {}

  list(user: { sub: string; role: UserRole }, petId?: string) {
    return this.repo.findMany(user, petId);
  }

  create(dto: CreateVaccineDto) {
    return this.repo.create({
      ...dto,
      status: normalizeVaccineStatus(dto.status, dto.nextDueDate),
      administeredDate: dto.administeredDate ? new Date(dto.administeredDate) : null,
      nextDueDate: new Date(dto.nextDueDate),
    });
  }

  complete(id: string) {
    return this.repo.update(id, { status: VaccineStatus.COMPLETED, administeredDate: new Date() });
  }

  update(id: string, dto: UpdateVaccineDto) {
    return this.repo.update(id, {
      ...dto,
      status: normalizeVaccineStatus(dto.status, dto.nextDueDate),
      administeredDate: dto.administeredDate ? new Date(dto.administeredDate) : null,
      nextDueDate: new Date(dto.nextDueDate),
    });
  }
}
