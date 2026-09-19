import { BusinessException } from '../../exceptions/business.exception';

export function validatePolicyDates(startDate: string, endDate: string) {
  if (new Date(endDate) <= new Date(startDate)) throw new BusinessException('保单结束日期必须晚于开始日期');
}
