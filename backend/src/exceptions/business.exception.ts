import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, public readonly code = 40001) {
    super({ code, message, data: null }, HttpStatus.OK);
  }
}
