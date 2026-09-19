import { Button, Card, Col, Input, Row, Select, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PetSpecies, enumLabels } from '../constants/enums';
import { usePets } from '../hooks/usePets';
import { PetAvatar } from '../components/common/PetAvatar';
import { ageText } from '../utils/format';

export default function PetList() {
  const [q, setQ] = useState('');
  const [species, setSpecies] = useState<string>();
  const { data = [], isLoading } = usePets({ q, species });
  return (
    <Space direction="vertical" size={20} className="page-block">
      <div className="page-heading">
        <div>
          <Typography.Title level={2}>我的宠物</Typography.Title>
          <Typography.Text type="secondary">集中管理宠物档案、病历、疫苗和保单。</Typography.Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />}>添加宠物</Button>
      </div>
      <Space wrap>
        <Input.Search placeholder="搜索名字或品种" allowClear onSearch={setQ} onChange={(event) => setQ(event.target.value)} />
        <Select
          allowClear
          placeholder="按物种筛选"
          style={{ width: 180 }}
          value={species}
          onChange={setSpecies}
          options={Object.values(PetSpecies).map((value) => ({ value, label: enumLabels[value] }))}
        />
      </Space>
      <Row gutter={[16, 16]}>
        {data.map((pet) => (
          <Col xs={24} sm={12} xl={8} key={pet.id}>
            <Link to={`/pets/${pet.id}`}>
              <Card loading={isLoading} className="pet-card">
                <Space align="start">
                  <PetAvatar name={pet.name} species={pet.species} src={pet.avatar} size={64} />
                  <div>
                    <Typography.Title level={4}>{pet.name}</Typography.Title>
                    <Typography.Text>{enumLabels[pet.species]} / {pet.breed}</Typography.Text>
                    <div className="muted-line">{ageText(pet.birthDate)} · {pet.weight}kg</div>
                  </div>
                </Space>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Space>
  );
}
