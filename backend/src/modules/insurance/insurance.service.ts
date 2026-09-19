import { Injectable } from '@nestjs/common';
import { InsuranceStatus, UserRole } from '../../constants/enums';
import { CreateInsuranceDto, UpdateInsuranceDto } from './insurance.dto';
import { InsuranceRepository } from './insurance.repository';
import { validatePolicyDates } from './insurance.validator';

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

  claim(id: string) {
    return this.repo.update(id, { status: InsuranceStatus.CLAIMING });
  }

  update(id: string, dto: UpdateInsuranceDto) {
    validatePolicyDates(dto.startDate, dto.endDate);
    return this.repo.update(id, { ...dto, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate) });
  }
}
