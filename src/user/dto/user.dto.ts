import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isDriver?: boolean = false;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class LoginUserDto extends PartialType(CreateUserDto) {}
