import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { RefreshJwtGuard } from './guards/refreshAuth.guard';
import { CreateDriverDto } from 'src/driver/dto/driver.dto';
import { DriverService } from 'src/driver/driver.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private driverService: DriverService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @Post('driver/register')
  async registerDriver(@Body() createDriverDto: CreateDriverDto) {
    return await this.driverService.createDriver(createDriverDto);
  }
}
