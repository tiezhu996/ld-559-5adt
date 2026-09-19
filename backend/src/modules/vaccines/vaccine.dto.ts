import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { VaccineStatus } from '../../constants/enums';

export class CreateVaccineDto {
  @IsString() petId!: string;
  @IsString() vaccineName!: string;
  @IsString() batchNo!: string;
  @IsOptional() @IsDateString() administeredDate?: string;
  @IsDateString() nextDueDate!: string;
  @IsString() vetId!: string;
  @IsEnum(VaccineStatus) status!: VaccineStatus;
}

export class UpdateVaccineDto extends CreateVaccineDto {}
