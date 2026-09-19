import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuditLog } from '../../middleware/audit-log';
import { AuthGuard } from '../auth/auth.guard';
import { CreateVaccineDto, UpdateVaccineDto } from './vaccine.dto';
import { VaccineService } from './vaccine.service';

@Controller('vaccines')
@UseGuards(AuthGuard)
export class VaccineController {
  constructor(private readonly service: VaccineService) {}

  @Get()
  async list(@Req() req: any, @Query('petId') petId?: string) {
    return { code: 0, message: 'ok', data: await this.service.list(req.user, petId) };
  }

  @Post()
  @AuditLog('记录疫苗接种')
  async create(@Body() dto: CreateVaccineDto) {
    return { code: 0, message: 'ok', data: await this.service.create(dto) };
  }

  @Patch(':id/complete')
  @AuditLog('疫苗标记完成')
  async complete(@Param('id') id: string) {
    return { code: 0, message: 'ok', data: await this.service.complete(id) };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateVaccineDto) {
    return { code: 0, message: 'ok', data: await this.service.update(id, dto) };
  }
}
