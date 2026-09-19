import { BusinessException } from '../../exceptions/business.exception';

export function validateMedicalCost(cost: number) {
  if (cost < 0) throw new BusinessException('就诊费用不能为负数');
}
