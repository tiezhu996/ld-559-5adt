import { Badge, Button, Dropdown, List, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useNotifications } from '../../hooks/useNotifications';

export function NotificationBell() {
  const { data = [] } = useNotifications();
  const unread = data.filter((item) => !item.read).length;
  return (
    <Dropdown
      trigger={['click']}
      dropdownRender={() => (
        <div className="notification-panel">
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.title} description={<Typography.Text type="secondary">{item.content}</Typography.Text>} />
              </List.Item>
            )}
          />
        </div>
      )}
    >
      <Badge count={unread} size="small">
        <Button icon={<BellOutlined />} />
      </Badge>
    </Dropdown>
  );
}
