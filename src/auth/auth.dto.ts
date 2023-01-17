import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RolesEnum } from '../commons/constants';

export class DataSignInDto {
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message:
      'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(32, {
    message:
      'Password is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  password: string;
}

export class DataSignUpDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message:
      'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(32, {
    message:
      'Password is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  password: string;
}

export class DataAccountDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  avatar: string | null;

  @IsString()
  content: string | null;

  @IsNotEmpty()
  @IsBoolean()
  confirmed: boolean;

  @IsNotEmpty()
  @IsEnum(RolesEnum)
  roles: string[];
}
