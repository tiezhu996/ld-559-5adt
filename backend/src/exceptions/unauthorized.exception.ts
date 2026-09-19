import { HttpException, HttpStatus } from '@nestjs/common';

export class AppUnauthorizedException extends HttpException {
  constructor(message = '登录状态已失效') {
    super({ code: 40100, message, data: null }, HttpStatus.UNAUTHORIZED);
  }
}
