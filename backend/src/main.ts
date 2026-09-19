import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ErrorHandlerFilter } from './middleware/error-handler';
import { AuditLogInterceptor } from './middleware/audit-log';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ origin: true, credentials: true });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new ErrorHandlerFilter());
  const reflector = app.get(Reflector);
  const prisma = app.get(PrismaService);
  app.useGlobalInterceptors(new AuditLogInterceptor(reflector, prisma));
  await prisma.enableShutdownHooks(app);
  await app.listen(Number(process.env.PORT || 38506), '0.0.0.0');
}

void bootstrap();
