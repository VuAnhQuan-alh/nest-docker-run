import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDoc } from '../users/users.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DataAccountDto, DataSignInDto, DataSignUpDto } from './auth.dto';
import * as argon from 'argon2';
import {
  PayloadDto,
  ResponseDto,
  TokenDto,
} from '../commons/data.transfer.objects';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDoc>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async handlerSignUp(
    data: DataSignUpDto,
  ): Promise<ResponseDto<string | null>> {
    try {
      const { email, username, password } = data;
      const isExistAccount = await this.usersModel.findOne({
        $or: [{ username: username }, { email: email }],
      });

      if (isExistAccount) return { message: 'Account is exist!', data: null };

      const hash = await argon.hash(password);
      const account = await this.usersModel.create({
        username,
        email,
        hash_password: hash,
      });
      const { _id, roles, confirmed } = account;
      const token = await this.signAccessToken({
        sub: _id,
        email,
        roles,
        confirmed,
      });
      const link = `${this.config.get<string>(
        'URI_LOCAL',
      )}/auth/activated?email=${email}&token=${token}`;

      return { message: 'Please, active is account!', data: link };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  public async handlerActivatedAccount(data: {
    email: string;
    token: string;
  }): Promise<boolean> {
    try {
      const payload = await this.verifyToken(data.token);
      if (!payload) return false;

      const { sub } = payload;
      await this.usersModel.updateOne(
        { _id: sub },
        { $set: { confirmed: true } },
      );

      return true;
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  public async handlerSignIn(
    data: DataSignInDto,
  ): Promise<ResponseDto<DataAccountDto>> {
    try {
      const { identifier, password } = data;
      const account = await this.usersModel.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });
      if (!account)
        return { message: 'Identifier does not exist!', data: null };

      const isMatched = await argon.verify(account.hash_password, password);
      if (!isMatched) return { message: 'Password is wrong!', data: null };

      const { _id, email, username, avatar, content, roles, confirmed } =
        account;
      const token = await this.signToken({
        sub: _id,
        email,
        roles,
        confirmed,
      });

      return {
        message: 'login successful!',
        data: { _id, email, username, avatar, content, roles },
        token: token as TokenDto,
      };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  // *** => private method <= ***
  private options(exp: string, sec: string) {
    return {
      expiresIn: this.config.get<string>(exp),
      secret: this.config.get<string>(sec),
    };
  }
  private async signToken(payload: PayloadDto): Promise<TokenDto> {
    try {
      const [access, refresh] = await Promise.all([
        this.jwtService.signAsync(
          payload,
          this.options('EXPIRES_ACCESS', 'JWT_ACCESS_SECRET'),
        ),
        this.jwtService.signAsync(
          payload,
          this.options('EXPIRES_REFRESH', 'JWT_REFRESH_SECRET'),
        ),
      ]);
      return { access, refresh };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  private async signAccessToken(payload: PayloadDto): Promise<string> {
    try {
      return await this.jwtService.signAsync(
        payload,
        this.options('EXPIRES_ACCESS_HI', 'JWT_ACCESS_SECRET'),
      );
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  private async signMailerToken(payload: PayloadDto): Promise<string> {
    try {
      return await this.jwtService.signAsync(
        payload,
        this.options('EXPIRES_MAILER', 'MAIL_SECRET'),
      );
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  private async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      });
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }
}
