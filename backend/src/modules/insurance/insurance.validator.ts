import { InsuranceStatus } from '../../constants/enums';
import { BusinessException } from '../../exceptions/business.exception';

export function validatePolicyDates(startDate: string, endDate: string) {
  if (new Date(endDate) <= new Date(startDate)) throw new BusinessException('保单结束日期必须晚于开始日期');
}

interface ClaimablePolicy {
  // 兼容 Prisma 生成的字符串字面量联合类型与本地枚举
  status: InsuranceStatus | `${InsuranceStatus}`;
  endDate: Date | string;
}

/**
 * 理赔资格校验：仅“生效 / 待续保”且未到期的保单可提交理赔。
 * 已过期或理赔中的保单直接抛业务异常，调用方不得再变更状态。
 * 异常 data 中携带当前保单快照，便于重复/并发提交时回读同一状态。
 */
export function assertClaimable<T extends ClaimablePolicy>(policy: T): void {
  if (policy.status === InsuranceStatus.CLAIMING) {
    throw new BusinessException('保单正在理赔中，请勿重复提交', 40901, policy);
  }
  const expired = policy.status === InsuranceStatus.EXPIRED || new Date(policy.endDate).getTime() <= Date.now();
  if (expired) {
    throw new BusinessException('保单已过期，无法提交理赔', 40902, policy);
  }
}
