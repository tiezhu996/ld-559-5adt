import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuditLog } from '../../middleware/audit-log';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePetDto, UpdatePetDto } from './pet.dto';
import { PetService } from './pet.service';

@Controller('pets')
@UseGuards(AuthGuard)
export class PetsController {
  constructor(private readonly service: PetService) {}

  @Get()
  async list(@Req() req: any, @Query('species') species?: string, @Query('q') q?: string) {
    return { code: 0, message: 'ok', data: await this.service.list(req.user, species, q) };
  }

  @Get(':id')
  async detail(@Param('id') id: string, @Req() req: any) {
    return { code: 0, message: 'ok', data: await this.service.detail(id, req.user) };
  }

  @Post()
  @AuditLog('添加宠物')
  async create(@Body() dto: CreatePetDto) {
    return { code: 0, message: 'ok', data: await this.service.create(dto) };
  }

  @Patch(':id')
  @AuditLog('编辑宠物')
  async update(@Param('id') id: string, @Body() dto: UpdatePetDto) {
    return { code: 0, message: 'ok', data: await this.service.update(id, dto) };
  }
}
