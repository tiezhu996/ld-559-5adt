import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppUnauthorizedException } from '../../exceptions/unauthorized.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (!token) throw new AppUnauthorizedException();
    try {
      request.user = await this.jwtService.verifyAsync(token);
      return true;
    } catch {
      throw new AppUnauthorizedException();
    }
  }
}
