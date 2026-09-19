import { Tag } from 'antd';
import { InsuranceStatus, VaccineStatus, enumLabels } from '../../constants/enums';

type Status = VaccineStatus | InsuranceStatus | string;

const colors: Record<string, string> = {
  [VaccineStatus.COMPLETED]: 'green',
  [VaccineStatus.PENDING]: 'gold',
  [VaccineStatus.OVERDUE]: 'red',
  [InsuranceStatus.ACTIVE]: 'green',
  [InsuranceStatus.PENDING_RENEWAL]: 'orange',
  [InsuranceStatus.EXPIRED]: 'red',
  [InsuranceStatus.CLAIMING]: 'blue',
};

export function StatusBadge({ status }: { status: Status }) {
  return <Tag color={colors[status] || 'default'}>{enumLabels[status as keyof typeof enumLabels] || status}</Tag>;
}
