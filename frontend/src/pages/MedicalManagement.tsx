import { Card, Drawer, Space, Table, Typography } from 'antd';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { medicalApi } from '../api/medicalApi';
import { CostBarChart } from '../components/charts/CostBarChart';
import { PetAvatar } from '../components/common/PetAvatar';
import { VisitType, enumLabels } from '../constants/enums';
import { formatCurrency, formatDate } from '../utils/format';
import type { MedicalRecord } from '../types/medical';

export default function MedicalManagement() {
  const { data = [] } = useQuery({ queryKey: ['medical'], queryFn: () => medicalApi.list() });
  const [selected, setSelected] = useState<MedicalRecord>();
  return (
    <Space direction="vertical" size={20} className="page-block">
      <Typography.Title level={2}>就诊管理</Typography.Title>
      <Card>
        <Table
          rowKey="id"
          dataSource={data}
          onRow={(record) => ({ onClick: () => setSelected(record) })}
          columns={[
            { title: '宠物', render: (_, record) => <Space><PetAvatar name={record.pet?.name || '宠'} species={record.pet!.species} size={32} />{record.pet?.name}</Space> },
            { title: '日期', dataIndex: 'visitDate', render: formatDate },
            { title: '类型', dataIndex: 'type', render: (value: VisitType) => enumLabels[value] },
            { title: '诊断', dataIndex: 'diagnosis' },
            { title: '费用', dataIndex: 'cost', render: formatCurrency },
          ]}
        />
      </Card>
      <Card title="费用统计">
        <CostBarChart records={data} />
      </Card>
      <Drawer title="处方详情" open={Boolean(selected)} onClose={() => setSelected(undefined)} width={420}>
        <Typography.Paragraph>{selected?.prescription}</Typography.Paragraph>
        <Typography.Text type="secondary">治疗方案：{selected?.treatment}</Typography.Text>
      </Drawer>
    </Space>
  );
}
