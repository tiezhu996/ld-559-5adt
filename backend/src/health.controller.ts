import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { code: 0, message: 'ok', data: { status: 'ok' } };
  }
}
