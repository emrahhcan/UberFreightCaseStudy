import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByEmail(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      _id: user._doc._id,
      firstName: user._doc.firstName,
      lastName: user._doc.lastName,
      email: user._doc.email,
      isDriver: user._doc.isDriver,
    };

    return {
      _id: user._doc._id,
      firstName: user._doc.firstName,
      lastName: user._doc.lastName,
      email: user._doc.email,
      isDriver: user._doc.isDriver,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
    };
  }

  async refreshToken(user: any) {
    const payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isDriver: user.isDriver,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
