import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_REFRESH_SECRET}`,
    });
  }

  async validate(payload: any) {
    return {
      _id: payload._id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      isDriver: payload.isDriver,
    };
  }
}
