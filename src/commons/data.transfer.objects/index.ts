import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { RolesEnum } from '../constants';

export class PayloadDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  sub: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(RolesEnum)
  roles: string[];

  @IsNotEmpty()
  @IsBoolean()
  confirmed: boolean;
}

export class TokenDto {
  @IsNotEmpty()
  @IsString()
  access: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  refresh?: string;
}

export class ResponseDto<T = null> {
  message: string;
  data: T;
  token?: TokenDto;
}
