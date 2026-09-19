import { Layout, Menu, Typography, Button } from 'antd';
import { CalendarOutlined, FileTextOutlined, HeartOutlined, MedicineBoxOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthGuard } from './guards/AuthGuard';
import PetList from './pages/PetList';
import PetDetail from './pages/PetDetail';
import MedicalManagement from './pages/MedicalManagement';
import VaccineManagement from './pages/VaccineManagement';
import InsuranceCenter from './pages/InsuranceCenter';
import Login from './pages/Login';
import { NotificationBell } from './components/common/NotificationBell';
import { useAuthStore } from './stores/authStore';

const nav = [
  { key: '/pets', icon: <HeartOutlined />, label: <Link to="/pets">我的宠物</Link> },
  { key: '/medical', icon: <MedicineBoxOutlined />, label: <Link to="/medical">就诊管理</Link> },
  { key: '/vaccines', icon: <CalendarOutlined />, label: <Link to="/vaccines">疫苗管理</Link> },
  { key: '/insurance', icon: <SafetyCertificateOutlined />, label: <Link to="/insurance">保险中心</Link> },
];

function AppLayout() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  return (
    <Layout className="app-shell">
      <Layout.Sider width={236} className="sidebar">
        <div className="sidebar-brand"><FileTextOutlined /> PetCare+</div>
        <Menu mode="inline" selectedKeys={[location.pathname.startsWith('/pets') ? '/pets' : location.pathname]} items={nav} />
      </Layout.Sider>
      <Layout>
        <Layout.Header className="topbar">
          <Typography.Text strong>{user?.name || '演示用户'}</Typography.Text>
          <NotificationBell />
          <Button onClick={logout}>退出</Button>
        </Layout.Header>
        <Layout.Content className="content">
          <Routes>
            <Route path="/pets" element={<PetList />} />
            <Route path="/pets/:id" element={<PetDetail />} />
            <Route path="/medical" element={<MedicalManagement />} />
            <Route path="/vaccines" element={<VaccineManagement />} />
            <Route path="/insurance" element={<InsuranceCenter />} />
            <Route path="*" element={<Navigate to="/pets" replace />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AuthGuard />}>
        <Route path="/*" element={<AppLayout />} />
      </Route>
    </Routes>
  );
}
