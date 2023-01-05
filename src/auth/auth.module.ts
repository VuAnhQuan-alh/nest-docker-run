import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../users/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefStrategy } from '../commons/strategies/jwt.ref.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtRefStrategy],
})
export class AuthModule {}
