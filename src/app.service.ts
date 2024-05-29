import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private configService: ConfigService) {
    this.logger.log(`Database URL: ${this.configService.get<string>('DATABASE_URL')}`);
  }
  getHello(): string {
    return 'Hello World! ';
  }
}
