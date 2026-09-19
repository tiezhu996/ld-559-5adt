import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BusinessException } from '../exceptions/business.exception';

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorHandlerFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof BusinessException) {
      const payload = exception.getResponse();
      return response.status(HttpStatus.OK).json(payload);
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const raw = exception.getResponse();
      const message = typeof raw === 'string' ? raw : (raw as { message?: string | string[] }).message;
      return response.status(status).json({
        code: status === HttpStatus.UNAUTHORIZED ? 40100 : status,
        message: Array.isArray(message) ? message.join('; ') : message || exception.message,
        data: null,
      });
    }

    this.logger.error(exception);
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: 50000,
      message: '系统异常，请稍后重试',
      data: null,
    });
  }
}
