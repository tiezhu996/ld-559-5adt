import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../../constants/enums';
import { BusinessException } from '../../exceptions/business.exception';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BusinessException('邮箱或密码错误', 40010);
    }
    const token = await this.jwt.signAsync({ sub: user.id, role: user.role, email: user.email, name: user.name });
    return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  }

  async ensureDemoUsers() {
    const count = await this.prisma.user.count();
    if (count > 0) return;
    const password = await bcrypt.hash('PetCare123', 10);
    await this.prisma.user.createMany({
      data: [
        { email: 'owner@petcare.test', password, name: '林一一', role: UserRole.PET_OWNER },
        { email: 'vet@petcare.test', password, name: '周医生', role: UserRole.VET },
        { email: 'admin@petcare.test', password, name: '平台管理员', role: UserRole.ADMIN },
      ],
    });
  }
}
