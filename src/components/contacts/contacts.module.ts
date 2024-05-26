import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
  TypeOrmModule.forFeature([Contact])
],

  controllers: [ContactsController],
  providers: [ContactsService,AuthService]
})
export class ContactsModule {}
