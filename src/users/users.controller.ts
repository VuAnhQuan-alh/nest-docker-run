import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { PayloadDto } from '../commons/data.transfer.objects';
import { JwtAuthGuard } from '../commons/guards/jwt.auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findOne(@Req() request: Request) {
    const payload = request.user as PayloadDto;
    return this.usersService.handlerProfile(payload);
  }
}
