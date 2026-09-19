import { Injectable } from '@nestjs/common';
import { UserRole } from '../../constants/enums';
import { CreateMedicalDto, UpdateMedicalDto } from './medical.dto';
import { MedicalRepository } from './medical.repository';
import { validateMedicalCost } from './medical.validator';

@Injectable()
export class MedicalService {
  constructor(private readonly repo: MedicalRepository) {}

  list(user: { sub: string; role: UserRole }, petId?: string, type?: string) {
    return this.repo.findMany(user, petId, type);
  }

  create(dto: CreateMedicalDto) {
    validateMedicalCost(dto.cost);
    return this.repo.create({
      ...dto,
      visitDate: new Date(dto.visitDate),
      nextVisitDate: dto.nextVisitDate ? new Date(dto.nextVisitDate) : undefined,
      attachments: dto.attachments || [],
    });
  }

  update(id: string, dto: UpdateMedicalDto) {
    validateMedicalCost(dto.cost);
    return this.repo.update(id, {
      ...dto,
      visitDate: new Date(dto.visitDate),
      nextVisitDate: dto.nextVisitDate ? new Date(dto.nextVisitDate) : null,
      attachments: dto.attachments || [],
    });
  }
}
