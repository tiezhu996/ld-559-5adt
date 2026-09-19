import { CallHandler, ExecutionContext, Injectable, NestInterceptor, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

export const AUDIT_LOG_KEY = 'auditLogAction';
export const AuditLog = (action: string) => SetMetadata(AUDIT_LOG_KEY, action);

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const action = this.reflector.getAllAndOverride<string>(AUDIT_LOG_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(async () => {
        if (!action) return;
        const res = context.switchToHttp().getResponse();
        await this.prisma.auditLog.create({
          data: {
            action,
            path: req.originalUrl || req.url,
            method: req.method,
            userId: req.user?.sub,
            bodySummary: JSON.stringify(req.body || {}).slice(0, 500),
            statusCode: res.statusCode,
          },
        }).catch(() => undefined);
      }),
    );
  }
}
