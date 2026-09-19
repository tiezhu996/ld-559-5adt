import { Button, Card, Col, Row, Space, Steps, Typography, message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { insuranceApi } from '../api/insuranceApi';
import { InsurancePieChart } from '../components/charts/InsurancePieChart';
import { StatusBadge } from '../components/common/StatusBadge';
import { enumLabels, InsuranceStatus } from '../constants/enums';
import type { InsurancePolicy } from '../types/insurance';
import { formatCurrency, formatDate } from '../utils/format';

/** 返回禁止发起理赔的原因，可理赔时返回 null（与后端规则保持一致） */
function claimBlockReason(policy: InsurancePolicy): string | null {
  if (policy.status === InsuranceStatus.CLAIMING) return '保单正在理赔中';
  if (policy.status === InsuranceStatus.EXPIRED) return '保单已过期';
  if (new Date(policy.endDate).getTime() < Date.now()) return '保单已到期待续保';
  return null;
}

export default function InsuranceCenter() {
  const client = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ['insurance'], queryFn: () => insuranceApi.list() });
  const claim = useMutation({
    mutationFn: insuranceApi.claim,
    onSuccess: () => {
      message.success('理赔提交成功，保单已进入理赔流程');
      client.invalidateQueries({ queryKey: ['insurance'] });
    },
    // 失败原因由 request 拦截器统一 message.error 展示
  });
  const submittingId = claim.isPending ? claim.variables : undefined;
  return (
    <Space direction="vertical" size={20} className="page-block">
      <Typography.Title level={2}>保险中心</Typography.Title>
      <Row gutter={[16, 16]}>
        {data.map((policy) => {
          const blockReason = claimBlockReason(policy);
          const submitting = submittingId === policy.id;
          return (
            <Col xs={24} lg={12} key={policy.id}>
              <Card actions={[
                <Button
                  key="claim"
                  type="link"
                  disabled={!!blockReason}
                  loading={submitting}
                  title={blockReason || undefined}
                  onClick={() => claim.mutate(policy.id)}
                >
                  {submitting ? '提交中' : blockReason || '提交理赔'}
                </Button>,
              ]}>
                <Space direction="vertical">
                  <Space><Typography.Title level={4}>{policy.provider}</Typography.Title><StatusBadge status={policy.status} /></Space>
                  <Typography.Text>{policy.pet?.name} · {enumLabels[policy.planType]}计划</Typography.Text>
                  <Typography.Text>保费 {formatCurrency(policy.premium)}，保障 {formatCurrency(policy.coverage)}</Typography.Text>
                  <Typography.Text type="secondary">{formatDate(policy.startDate)} 至 {formatDate(policy.endDate)}</Typography.Text>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}><Card title="理赔进度"><Steps current={1} items={[{ title: '提交' }, { title: '审核' }, { title: '赔付' }]} /></Card></Col>
        <Col xs={24} lg={12}><Card title="年度保费分析"><InsurancePieChart policies={data} /></Card></Col>
      </Row>
    </Space>
  );
}
