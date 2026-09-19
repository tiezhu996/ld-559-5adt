import { Injectable } from '@nestjs/common';
import { UserRole } from '../../constants/enums';
import { BusinessException } from '../../exceptions/business.exception';
import { CreatePetDto, UpdatePetDto } from './pet.dto';
import { PetRepository } from './pet.repository';
import { validatePetWeight } from './pet.validator';

@Injectable()
export class PetService {
  constructor(private readonly repo: PetRepository) {}

  list(user: { sub: string; role: UserRole }, species?: string, q?: string) {
    return this.repo.findMany(user, species, q);
  }

  async detail(id: string, user: { sub: string; role: UserRole }) {
    const pet = await this.repo.findById(id);
    if (!pet) throw new BusinessException('宠物不存在', 40401);
    if (user.role === UserRole.PET_OWNER && pet.ownerId !== user.sub) throw new BusinessException('无权查看该宠物', 40302);
    return pet;
  }

  create(dto: CreatePetDto) {
    validatePetWeight(dto);
    return this.repo.create({ ...dto, birthDate: new Date(dto.birthDate) });
  }

  update(id: string, dto: UpdatePetDto) {
    validatePetWeight(dto);
    return this.repo.update(id, { ...dto, birthDate: new Date(dto.birthDate) });
  }
}
