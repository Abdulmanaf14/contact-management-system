import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Session, UnauthorizedException } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { AuthService } from 'src/auth/auth.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService,
    private readonly authService: AuthService,  ) {}

  @Post('addContact')
  async create(@Body() contact: Contact,@Session() session: Record<string, any>) {
    console.log("sess",session);
    const accessToken = session.accessToken;
    if (!accessToken) {
      throw new UnauthorizedException('Access token not found in session.');
    }

    const decoded = this.authService.verifyAccessToken(accessToken)

    contact.user = {
      name: session.userName,
      phoneNumber:session.userName,
      email: session.email,
      password:"nil", 
      id:decoded.userId
  }

     const res = await this.contactsService.create(contact);
    return res

  }

}
