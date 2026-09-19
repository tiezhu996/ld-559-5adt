import { Button, Card, Form, Input, Typography } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { useAuthStore } from '../stores/authStore';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  const login = useLogin();
  const from = (location.state as { from?: string } | null)?.from || '/pets';

  if (token) return <Navigate to={from} replace />;

  return (
    <main className="login-shell">
      <section className="login-copy">
        <div className="brand-mark"><HeartFilled /> PetCare+</div>
        <Typography.Title>宠物医疗与保险管理平台</Typography.Title>
        <Typography.Paragraph>把档案、病历、疫苗提醒和保单状态放在同一个工作台，减少遗漏和重复查询。</Typography.Paragraph>
      </section>
      <Card className="login-card">
        <Typography.Title level={3}>登录工作台</Typography.Title>
        <Form
          layout="vertical"
          initialValues={{ email: 'owner@petcare.test', password: 'PetCare123' }}
          onFinish={(values) => login.mutate(values, { onSuccess: () => navigate(from, { replace: true }) })}
        >
          <Form.Item name="email" label="邮箱"><Input /></Form.Item>
          <Form.Item name="password" label="密码"><Input.Password /></Form.Item>
          <Button type="primary" htmlType="submit" loading={login.isPending} block>登录</Button>
        </Form>
      </Card>
    </main>
  );
}
