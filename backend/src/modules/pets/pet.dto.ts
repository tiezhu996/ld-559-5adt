import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Gender, PetSpecies } from '../../constants/enums';

export class CreatePetDto {
  @IsString() ownerId!: string;
  @IsString() name!: string;
  @IsEnum(PetSpecies) species!: PetSpecies;
  @IsString() breed!: string;
  @IsEnum(Gender) gender!: Gender;
  @IsDateString() birthDate!: string;
  @IsNumber() weight!: number;
  @IsOptional() @IsString() microchipNo?: string;
  @IsOptional() @IsString() avatar?: string;
  @IsOptional() @IsString() allergies?: string;
  @IsOptional() @IsString() medicalHistory?: string;
}

export class UpdatePetDto extends CreatePetDto {}
