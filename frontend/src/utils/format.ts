import dayjs from 'dayjs';

export const formatDate = (value?: string) => (value ? dayjs(value).format('YYYY-MM-DD') : '-');
export const formatCurrency = (value: number) => `¥${Number(value || 0).toLocaleString('zh-CN')}`;
export const ageText = (birthDate: string) => `${dayjs().diff(dayjs(birthDate), 'year')} 岁`;
