import { Card, Descriptions, List, Space, Tabs, Timeline, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { usePetDetail, usePetInsurance, usePetMedical, usePetVaccines } from '../hooks/usePets';
import { PetAvatar } from '../components/common/PetAvatar';
import { VaccineCalendar } from '../components/common/VaccineCalendar';
import { StatusBadge } from '../components/common/StatusBadge';
import { enumLabels } from '../constants/enums';
import { formatCurrency, formatDate } from '../utils/format';

export default function PetDetail() {
  const { id = '' } = useParams();
  const { data: pet } = usePetDetail(id);
  const { data: medical = [] } = usePetMedical(id);
  const { data: vaccines = [] } = usePetVaccines(id);
  const { data: policies = [] } = usePetInsurance(id);
  if (!pet) return null;
  return (
    <Space direction="vertical" size={20} className="page-block">
      <Space>
        <PetAvatar name={pet.name} species={pet.species} src={pet.avatar} size={72} />
        <div>
          <Typography.Title level={2}>{pet.name}</Typography.Title>
          <Typography.Text type="secondary">{enumLabels[pet.species]} · {pet.breed}</Typography.Text>
        </div>
      </Space>
      <Tabs
        items={[
          {
            key: 'base',
            label: '基本信息',
            children: (
              <Card>
                <Descriptions column={2}>
                  <Descriptions.Item label="性别">{enumLabels[pet.gender]}</Descriptions.Item>
                  <Descriptions.Item label="生日">{formatDate(pet.birthDate)}</Descriptions.Item>
                  <Descriptions.Item label="体重">{pet.weight}kg</Descriptions.Item>
                  <Descriptions.Item label="芯片号">{pet.microchipNo || '-'}</Descriptions.Item>
                  <Descriptions.Item label="过敏史">{pet.allergies || '-'}</Descriptions.Item>
                  <Descriptions.Item label="既往病史">{pet.medicalHistory || '-'}</Descriptions.Item>
                </Descriptions>
              </Card>
            ),
          },
          {
            key: 'medical',
            label: '就诊记录',
            children: <Timeline items={medical.map((record) => ({ children: `${formatDate(record.visitDate)} ${enumLabels[record.type]}：${record.diagnosis}` }))} />,
          },
          { key: 'vaccines', label: '疫苗日历', children: <VaccineCalendar records={vaccines} /> },
          {
            key: 'insurance',
            label: '关联保单',
            children: (
              <List
                dataSource={policies}
                renderItem={(policy) => (
                  <List.Item actions={[<StatusBadge key="status" status={policy.status} />]}>
                    <List.Item.Meta title={`${policy.provider} ${enumLabels[policy.planType]}计划`} description={`${formatCurrency(policy.premium)} / 保障 ${formatCurrency(policy.coverage)}`} />
                  </List.Item>
                )}
              />
            ),
          },
        ]}
      />
    </Space>
  );
}
