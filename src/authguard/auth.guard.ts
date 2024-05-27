import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = request.session;
    const authHeader = request.headers['authorization'];
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : session.accessToken;

    if (!accessToken) {
      throw new UnauthorizedException('Access token not found.');
    }

    const isValidToken = await this.authService.verifyAccessToken(accessToken);
    if (!isValidToken) {
      throw new UnauthorizedException('Invalid access token.');
    }

    return true;
  }
}
