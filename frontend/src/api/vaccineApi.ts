import { request, unwrap } from '../utils/request';
import type { VaccineRecord } from '../types/vaccine';
import { mockVaccines } from '../utils/mockData';

export const vaccineApi = {
  list: (params?: { petId?: string }) => unwrap<VaccineRecord[]>(request.get('/vaccines', { params }), mockVaccines),
  complete: (id: string) => request.patch(`/vaccines/${id}/complete`),
};
