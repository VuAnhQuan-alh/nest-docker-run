import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../commons/guards/jwt.auth.guard';
import { Payload } from '../commons/decorators/payload.decrators';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findOne(@Payload('sub') sub: string) {
    return this.usersService.handlerProfile(sub);
  }
}
