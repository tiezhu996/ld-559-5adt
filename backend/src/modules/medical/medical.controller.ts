import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuditLog } from '../../middleware/audit-log';
import { AuthGuard } from '../auth/auth.guard';
import { CreateMedicalDto, UpdateMedicalDto } from './medical.dto';
import { MedicalService } from './medical.service';

@Controller('medical')
@UseGuards(AuthGuard)
export class MedicalController {
  constructor(private readonly service: MedicalService) {}

  @Get()
  async list(@Req() req: any, @Query('petId') petId?: string, @Query('type') type?: string) {
    return { code: 0, message: 'ok', data: await this.service.list(req.user, petId, type) };
  }

  @Post()
  @AuditLog('创建就诊记录')
  async create(@Body() dto: CreateMedicalDto) {
    return { code: 0, message: 'ok', data: await this.service.create(dto) };
  }

  @Patch(':id')
  @AuditLog('编辑诊断信息')
  async update(@Param('id') id: string, @Body() dto: UpdateMedicalDto) {
    return { code: 0, message: 'ok', data: await this.service.update(id, dto) };
  }
}
