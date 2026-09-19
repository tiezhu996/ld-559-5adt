import { Calendar, List } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import type { VaccineRecord } from '../../types/vaccine';
import { StatusBadge } from './StatusBadge';

export function VaccineCalendar({ records }: { records: VaccineRecord[] }) {
  const cellRender = (value: Dayjs) => {
    const due = records.filter((item) => dayjs(item.nextDueDate).isSame(value, 'day'));
    if (!due.length) return null;
    return (
      <List
        size="small"
        dataSource={due}
        renderItem={(item) => (
          <List.Item className="calendar-item">
            {item.vaccineName}
            <StatusBadge status={item.status} />
          </List.Item>
        )}
      />
    );
  };
  return <Calendar fullscreen={false} cellRender={cellRender} />;
}
