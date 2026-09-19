import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    await this.authService.ensureDemoUsers();
    return { code: 0, message: 'ok', data: await this.authService.login(body.email, body.password) };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me() {
    return { code: 0, message: 'ok', data: null };
  }
}
