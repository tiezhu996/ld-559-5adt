import { useQuery } from '@tanstack/react-query';
import { request, unwrap } from '../utils/request';

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () =>
      unwrap<NotificationItem[]>(
        request.get('/notifications'),
        [{ id: 'n1', title: '疫苗即将到期', content: '豆包的狂犬疫苗需要续种', type: 'VACCINE', read: false, createdAt: new Date().toISOString() }],
      ),
  });
}
