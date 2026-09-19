import { VaccineStatus } from '../../constants/enums';

export function normalizeVaccineStatus(status: VaccineStatus, nextDueDate: string) {
  if (status === VaccineStatus.COMPLETED) return status;
  return new Date(nextDueDate).getTime() < Date.now() ? VaccineStatus.OVERDUE : status;
}
