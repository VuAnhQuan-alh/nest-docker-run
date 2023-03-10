import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
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
  attributes: T | object[];
  token?: TokenDto;
  count?: number;
}

export class PaginationDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  skip?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  pageSize?: number;
}
