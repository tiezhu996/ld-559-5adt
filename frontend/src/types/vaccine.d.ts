import { VaccineStatus } from '../constants/enums';
import { Pet } from './pet';

export interface VaccineRecord {
  id: string;
  petId: string;
  vaccineName: string;
  batchNo: string;
  administeredDate?: string;
  nextDueDate: string;
  vetId: string;
  status: VaccineStatus;
  pet?: Pet;
}
