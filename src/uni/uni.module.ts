import { Module } from '@nestjs/common';
import { UniService } from './uni.service';
import { UniController } from './uni.controller';

@Module({
  controllers: [UniController],
  providers: [UniService]
})
export class UniModule {}
