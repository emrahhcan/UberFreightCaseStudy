import { IsBoolean, IsEmail, IsObject, IsString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isDriver?: boolean = true;

  @IsObject()
  vehicle: {
    brand: string;
    model: string;
    year: number;
  };
}
