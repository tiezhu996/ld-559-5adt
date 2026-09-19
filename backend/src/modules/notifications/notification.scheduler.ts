import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationService } from './notification.service';

@Injectable()
export class NotificationScheduler {
  private readonly logger = new Logger(NotificationScheduler.name);

  constructor(private readonly service: NotificationService) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleReminders() {
    await this.service.scanAndCreateReminders();
    this.logger.log('提醒通知扫描完成');
  }
}
