import ReactECharts from 'echarts-for-react';
import type { InsurancePolicy } from '../../types/insurance';

export function InsurancePieChart({ policies }: { policies: InsurancePolicy[] }) {
  return (
    <ReactECharts
      style={{ height: 260 }}
      option={{
        tooltip: { trigger: 'item' },
        series: [
          {
            type: 'pie',
            radius: ['45%', '72%'],
            data: policies.map((policy) => ({ name: policy.provider, value: Number(policy.premium) })),
            color: ['#0f8b8d', '#e1a23a', '#7c6fef'],
          },
        ],
      }}
    />
  );
}
