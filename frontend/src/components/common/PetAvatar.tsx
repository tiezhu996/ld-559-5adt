import { Avatar } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { PetSpecies } from '../../constants/enums';

interface Props {
  name: string;
  species: PetSpecies;
  src?: string;
  size?: number;
}

export function PetAvatar({ name, species, src, size = 48 }: Props) {
  const color = species === PetSpecies.CAT ? '#7c6fef' : species === PetSpecies.DOG ? '#0f8b8d' : '#a66f2a';
  return (
    <Avatar size={size} src={src} style={{ background: color }}>
      {src ? null : name?.slice(0, 1) || <HeartFilled />}
    </Avatar>
  );
}
