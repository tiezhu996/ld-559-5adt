import { ApiResponse, request, unwrap } from '../utils/request';
import type { InsurancePolicy } from '../types/insurance';
import { mockInsurance } from '../utils/mockData';

export const insuranceApi = {
  list: (params?: { petId?: string }) => unwrap<InsurancePolicy[]>(request.get('/insurance', { params }), mockInsurance),
  // 不使用 unwrap：理赔失败（已过期/理赔中/无权限）必须向上抛出，
  // 由请求拦截器统一提示原因，页面据此回读最新状态。
  claim: (id: string) => request.patch<ApiResponse<InsurancePolicy>>(`/insurance/${id}/claim`),
};
