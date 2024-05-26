import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name?: string;

  @IsString()
  phoneNumber?: string ;

  @IsString()
  password?: string;

  @IsString()
  @IsOptional()
  email?: string;
}


export class LoginUserDto {
  @IsString()
  phoneNumber?: string;

  @IsString()
  password?: string;
}

