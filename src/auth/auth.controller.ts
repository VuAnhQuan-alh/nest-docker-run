import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DataAccountDto, DataSignInDto, DataSignUpDto } from './auth.dto';
import { Constants } from '../commons/constants';
import { PayloadDto, ResponseDto } from '../commons/data.transfer.objects';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from '../commons/decorators/payload.decrators';

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
    @Body(new ValidationPipe()) data: DataSignInDto,
  ): Promise<ResponseDto<DataAccountDto>> {
    const account = await this.authService.handlerSignIn(data);
    if (!account.attributes) throw new BadRequestException(account.message);

    return account;
  }

  @Get('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(@Payload() payload: PayloadDto): Promise<ResponseDto<any>> {
    const token = await this.authService.handlerRefreshToken(payload);

    return {
      message: 'refresh token successful!',
      attributes: null,
      token: { access: token },
    };
  }

  @Get('logout')
  logout(): ResponseDto {
    return { message: 'sign out successful!', attributes: null };
  }
}
