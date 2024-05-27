import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Session, UnauthorizedException, NotFoundException, Query, Req, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { AuthService } from 'src/auth/auth.service';
import { UpdateSpamStatusDto } from './dto/update-contact.dto';
import { AuthGuard } from 'src/authguard/auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService,
    private readonly authService: AuthService,  ) {}

  @Post('addContact')
  @UseGuards(AuthGuard)
  async create(@Body() contact: Contact,@Session() session: Record<string, any>, @Req() request: Request) {

    const authHeader = request.headers['authorization'];
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : session.accessToken;
ath nicheyyenda SVGRadialGradientElement    
    if (!accessToken) {
      throw new UnauthorizedException('Access token not found in session.');
    }
    
    const isValidToken = this.authService.verifyAccessToken(accessToken);
    if (!isValidToken) {
      throw new UnauthorizedException('Invalid access token.');
    }
    if(contact.phoneNumber!=undefined){
    const existingUser = await this.contactsService.findByPhoneNumber(contact.phoneNumber);
    if (existingUser) {
      throw new BadRequestException('Phone number already saved.');
    }
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

  @Patch(':phoneNumber/spam')
  async updateSpamStatus( @Param('phoneNumber') phoneNumber: string, @Body() updateSpamStatusDto: UpdateSpamStatusDto, @Session() session: Record<string, any>) {
    return await this.contactsService.updateSpamStatus(phoneNumber, updateSpamStatusDto,session);
  }
  @Get('search/:phoneNumber')
  async searchByPhoneNumber(@Param('phoneNumber') phoneNumber: string, @Session() session: Record<string, any>): Promise<any> {
    const contacts = await this.contactsService.searchByPhoneNumber(phoneNumber,session);
    if (!contacts.length) {
      throw new NotFoundException('No contacts found');
    }

    return contacts.map(contact => ({
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      is_spam: contact.isSpam,
    }));
  }

  @Get('searchName/name')
  async searchByName(@Query('name') name: string,@Session() session: Record<string, any>): Promise<any> {
    const contacts = await this.contactsService.searchByName(name,session);
    if (!contacts.length) {
      throw new NotFoundException('No contacts found');
    }

    return contacts.map(contact => ({
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      is_spam: contact.isSpam,
    }));
  }



}
