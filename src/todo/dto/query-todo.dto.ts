import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class QueryTodoDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  isDone?: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  createdOfDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  pageSize?: number;
}
