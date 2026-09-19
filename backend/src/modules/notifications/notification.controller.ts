import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { NotificationService } from './notification.service';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Get()
  async list(@Req() req: any) {
    return { code: 0, message: 'ok', data: await this.service.list(req.user.sub) };
  }

  @Get('unread-count')
  async unread(@Req() req: any) {
    return { code: 0, message: 'ok', data: await this.service.unreadCount(req.user.sub) };
  }

  @Patch(':id/read')
  async markRead(@Param('id') id: string) {
    return { code: 0, message: 'ok', data: await this.service.markRead(id) };
  }
}
