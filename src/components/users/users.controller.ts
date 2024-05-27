import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Session,HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    
    if(!user.password || !user.phoneNumber || !user.name){
      throw new BadRequestException('Name, phone number, and password are required.');
    }
    const existingUser = await this.usersService.findByPhoneNumber(user.phoneNumber);
    if (existingUser) {
      throw new BadRequestException('Phone number already registered.');
    }
  
    user.password = await bcrypt.hash(user.password, 10);
    return this.usersService.create(user);
  
  }

  @Post('login')
  async login(@Body() loginDto: { phoneNumber: string, password: string }, @Session() session: any) {
    const user = await this.usersService.validateUser(loginDto.phoneNumber, loginDto.password);
    console.log("user=>",user);
    
    if (!user) {
      throw new BadRequestException('Invalid credentials.');
    }
    
    if (typeof user.id !== 'undefined') {
      const accessToken = this.authService.generateAccessToken(user.id);
      
      
      session.accessToken = accessToken;
      session.userId = user.id;
      session.userName = user.name
      session.email = user.email
      session.phone = user.phoneNumber
    }
    
    return session
  }

  @Get('me')
  async getProfile(@Session() session: Record<string, any>){
    
    if (!session.userId) {
      throw new BadRequestException('Not logged in.');
    }
    const user = await this.usersService.findById(session.userId,session);
    return session ;
  }
  @Post('logout')
  @HttpCode(200)
  async logout(@Session() session: Record<string, any>): Promise<string> {
    console.log("sess",session);
    if(!session.accessToken){
      throw new BadRequestException('Logout failed.');
    }
    session.destroy((err) => {
      console.log("err",err);
  })
    return 'Logout successful';
  }

 
}
