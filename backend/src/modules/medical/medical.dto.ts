import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { VisitType } from '../../constants/enums';

export class CreateMedicalDto {
  @IsString() petId!: string;
  @IsString() vetId!: string;
  @IsString() clinicId!: string;
  @IsDateString() visitDate!: string;
  @IsEnum(VisitType) type!: VisitType;
  @IsString() diagnosis!: string;
  @IsString() treatment!: string;
  @IsString() prescription!: string;
  @IsNumber() cost!: number;
  @IsOptional() @IsDateString() nextVisitDate?: string;
  @IsOptional() @IsArray() attachments?: string[];
}

export class UpdateMedicalDto extends CreateMedicalDto {}
