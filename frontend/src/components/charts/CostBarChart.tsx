import ReactECharts from 'echarts-for-react';
import type { MedicalRecord } from '../../types/medical';
import { formatDate } from '../../utils/format';

export function CostBarChart({ records }: { records: MedicalRecord[] }) {
  return (
    <ReactECharts
      style={{ height: 260 }}
      option={{
        tooltip: {},
        grid: { left: 36, right: 16, top: 24, bottom: 32 },
        xAxis: { type: 'category', data: records.map((record) => formatDate(record.visitDate)) },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: records.map((record) => Number(record.cost)), itemStyle: { color: '#0f8b8d' } }],
      }}
    />
  );
}
