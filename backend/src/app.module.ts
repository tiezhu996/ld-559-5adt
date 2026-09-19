import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { PetsController } from './modules/pets/pet.controller';
import { PetService } from './modules/pets/pet.service';
import { PetRepository } from './modules/pets/pet.repository';
import { MedicalController } from './modules/medical/medical.controller';
import { MedicalService } from './modules/medical/medical.service';
import { MedicalRepository } from './modules/medical/medical.repository';
import { VaccineController } from './modules/vaccines/vaccine.controller';
import { VaccineService } from './modules/vaccines/vaccine.service';
import { VaccineRepository } from './modules/vaccines/vaccine.repository';
import { InsuranceController } from './modules/insurance/insurance.controller';
import { InsuranceService } from './modules/insurance/insurance.service';
import { InsuranceRepository } from './modules/insurance/insurance.repository';
import { NotificationController } from './modules/notifications/notification.controller';
import { NotificationService } from './modules/notifications/notification.service';
import { NotificationScheduler } from './modules/notifications/notification.scheduler';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'ldpetcare_dev_secret',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [
    HealthController,
    AuthController,
    PetsController,
    MedicalController,
    VaccineController,
    InsuranceController,
    NotificationController,
  ],
  providers: [
    PrismaService,
    AuthService,
    PetService,
    PetRepository,
    MedicalService,
    MedicalRepository,
    VaccineService,
    VaccineRepository,
    InsuranceService,
    InsuranceRepository,
    NotificationService,
    NotificationScheduler,
  ],
})
export class AppModule {}
