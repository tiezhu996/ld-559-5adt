import { Gender, PetSpecies } from '../constants/enums';

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: PetSpecies;
  breed: string;
  gender: Gender;
  birthDate: string;
  weight: number;
  microchipNo?: string;
  avatar?: string;
  allergies?: string;
  medicalHistory?: string;
}
