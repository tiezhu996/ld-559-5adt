import { request, unwrap } from '../utils/request';
import type { InsurancePolicy } from '../types/insurance';
import { mockInsurance } from '../utils/mockData';

export const insuranceApi = {
  list: (params?: { petId?: string }) => unwrap<InsurancePolicy[]>(request.get('/insurance', { params }), mockInsurance),
  claim: (id: string) => request.patch(`/insurance/${id}/claim`),
};
