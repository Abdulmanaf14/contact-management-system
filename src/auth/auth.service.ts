import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Session } from 'express-session';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly secretKey = 'qwertyuioplkjhgfdsazxcvbm';

  generateAccessToken(userId: number): string {
    return jwt.sign({ userId }, this.secretKey, { expiresIn: '1h' }); 
  }

  verifyAccessToken(token: string): { userId: number } {
    try {
      return jwt.verify(token, this.secretKey) as { userId: number };
    } catch (error) {
      throw new UnauthorizedException('Invalid access token.');
    }
  }

}