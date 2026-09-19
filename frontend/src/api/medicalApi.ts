import { request, unwrap } from '../utils/request';
import type { MedicalRecord } from '../types/medical';
import { mockMedical } from '../utils/mockData';

export const medicalApi = {
  list: (params?: { petId?: string; type?: string }) => unwrap<MedicalRecord[]>(request.get('/medical', { params }), mockMedical),
  create: (payload: Partial<MedicalRecord>) => request.post('/medical', payload),
};
