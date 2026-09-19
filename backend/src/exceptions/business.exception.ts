import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, public readonly code = 40001, data: unknown = null) {
    super({ code, message, data }, HttpStatus.OK);
  }
}
