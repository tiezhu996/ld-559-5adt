import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuditLog } from '../../middleware/audit-log';
import { AuthGuard } from '../auth/auth.guard';
import { CreateInsuranceDto, UpdateInsuranceDto } from './insurance.dto';
import { InsuranceService } from './insurance.service';

@Controller('insurance')
@UseGuards(AuthGuard)
export class InsuranceController {
  constructor(private readonly service: InsuranceService) {}

  @Get()
  async list(@Req() req: any, @Query('petId') petId?: string) {
    return { code: 0, message: 'ok', data: await this.service.list(req.user, petId) };
  }

  @Post()
  @AuditLog('投保新保单')
  async create(@Body() dto: CreateInsuranceDto) {
    return { code: 0, message: 'ok', data: await this.service.create(dto) };
  }

  @Patch(':id/claim')
  @AuditLog('提交理赔')
  async claim(@Param('id') id: string) {
    return { code: 0, message: 'ok', data: await this.service.claim(id) };
  }

  @Patch(':id')
  @AuditLog('续保操作')
  async update(@Param('id') id: string, @Body() dto: UpdateInsuranceDto) {
    return { code: 0, message: 'ok', data: await this.service.update(id, dto) };
  }
}
