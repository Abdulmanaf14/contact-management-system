import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Contact])
],
  controllers: [UsersController],
  providers: [UsersService,AuthService]
})
export class UsersModule {}
