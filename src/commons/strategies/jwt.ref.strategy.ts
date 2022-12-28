import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PayloadDto } from '../data.transfer.objects';

@Injectable()
export class JwtRefStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refresh_token;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
    });
  }

  validate(payload: PayloadDto) {
    return payload;
  }
}
