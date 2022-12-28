import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DataSignInDto, DataSignUpDto } from './auth.dto';
import { Response } from 'express';
import { TokenDto } from '../commons/data.transfer.objects';
import { Constants } from '../commons/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly prefix = Constants.pre_router;

  @Post('register')
  async register(
    @Body(new ValidationPipe()) data: DataSignUpDto,
  ): Promise<any> {
    const account = await this.authService.handlerSignUp(data);
    if (!account) throw new BadRequestException(account.message);

    return account;
  }

  @Get('activated')
  async active(
    @Query(new ValidationPipe()) params: { email: string; token: string },
  ): Promise<any> {
    const isActivated = await this.authService.handlerActivatedAccount(params);
    if (!isActivated) throw new BadRequestException('Activated failed!');

    return { message: 'login again to page!', data: null };
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body(new ValidationPipe()) data: DataSignInDto,
  ): Promise<any> {
    const account = await this.authService.handlerSignIn(data);
    if (!account.data) throw new BadRequestException(account.message);

    response.cookie('access_token', account.token.access, {
      path: this.prefix,
    });
    response.cookie('refresh_token', account.token.refresh, {
      path: this.prefix,
    });

    return { message: account.message, data: account.data };
  }
}
