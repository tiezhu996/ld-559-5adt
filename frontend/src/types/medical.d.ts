import { VisitType } from '../constants/enums';
import { Pet } from './pet';

export interface MedicalRecord {
  id: string;
  petId: string;
  vetId: string;
  clinicId: string;
  visitDate: string;
  type: VisitType;
  diagnosis: string;
  treatment: string;
  prescription: string;
  cost: number;
  nextVisitDate?: string;
  attachments: string[];
  pet?: Pet;
}
