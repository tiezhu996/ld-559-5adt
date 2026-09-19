import { CreatePetDto } from './pet.dto';
import { BusinessException } from '../../exceptions/business.exception';

export function validatePetWeight(dto: Pick<CreatePetDto, 'weight'>) {
  if (dto.weight <= 0) throw new BusinessException('宠物体重必须大于 0');
}
