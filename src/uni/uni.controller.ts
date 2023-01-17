import { Body, Controller, Get, Post } from '@nestjs/common';
import { UniService } from './uni.service';

@Controller('uni')
export class UniController {
  constructor(private readonly uniService: UniService) {}

  @Get()
  findAllUnis() {
    return this.uniService.findAll();
  }

  @Post()
  createdUnis(@Body() n: number) {
    return this.uniService.create(n);
  }
}
