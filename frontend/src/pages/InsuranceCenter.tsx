import { Button, Card, Col, Row, Space, Steps, Typography, message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { insuranceApi } from '../api/insuranceApi';
import { InsurancePieChart } from '../components/charts/InsurancePieChart';
import { StatusBadge } from '../components/common/StatusBadge';
import { InsuranceStatus, UserRole, enumLabels } from '../constants/enums';
import { useAuthStore } from '../stores/authStore';
import type { InsurancePolicy } from '../types/insurance';
import { formatCurrency, formatDate } from '../utils/format';

/** 仅“生效/待续保”且未到期的保单允许发起理赔，与后端校验口径一致 */
function isClaimable(policy: InsurancePolicy) {
  const claimableStatus = policy.status === InsuranceStatus.ACTIVE || policy.status === InsuranceStatus.PENDING_RENEWAL;
  return claimableStatus && new Date(policy.endDate).getTime() > Date.now();
}

export default function InsuranceCenter() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const { data = [] } = useQuery({ queryKey: ['insurance'], queryFn: () => insuranceApi.list() });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['insurance'] });
  const claimMutation = useMutation({
    mutationFn: (id: string) => insuranceApi.claim(id),
    onSuccess: () => {
      message.success('理赔申请已提交，保单进入理赔中');
      refresh();
    },
    // 失败原因由请求拦截器统一 message.error 展示；此处刷新列表，
    // 让重复/并发提交回读到同一“理赔中”状态。
    onError: () => refresh(),
  });

  const renderClaimButton = (policy: InsurancePolicy) => {
    const submitting = claimMutation.isPending && claimMutation.variables === policy.id;
    const disabled = user?.role !== UserRole.PET_OWNER || !isClaimable(policy) || claimMutation.isPending;
    return (
      <Button
        key="claim"
        type="link"
        disabled={disabled}
        loading={submitting}
        onClick={() => claimMutation.mutate(policy.id)}
      >
        {submitting ? '提交中' : '提交理赔'}
      </Button>
    );
  };

  return (
    <Space direction="vertical" size={20} className="page-block">
      <Typography.Title level={2}>保险中心</Typography.Title>
      <Row gutter={[16, 16]}>
        {data.map((policy) => (
          <Col xs={24} lg={12} key={policy.id}>
            <Card actions={[renderClaimButton(policy)]}>
              <Space direction="vertical">
                <Space><Typography.Title level={4}>{policy.provider}</Typography.Title><StatusBadge status={policy.status} /></Space>
                <Typography.Text>{policy.pet?.name} · {enumLabels[policy.planType]}计划</Typography.Text>
                <Typography.Text>保费 {formatCurrency(policy.premium)}，保障 {formatCurrency(policy.coverage)}</Typography.Text>
                <Typography.Text type="secondary">{formatDate(policy.startDate)} 至 {formatDate(policy.endDate)}</Typography.Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}><Card title="理赔进度"><Steps current={1} items={[{ title: '提交' }, { title: '审核' }, { title: '赔付' }]} /></Card></Col>
        <Col xs={24} lg={12}><Card title="年度保费分析"><InsurancePieChart policies={data} /></Card></Col>
      </Row>
    </Space>
  );
}
