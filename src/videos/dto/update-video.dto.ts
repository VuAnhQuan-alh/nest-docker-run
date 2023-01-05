import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateVideoDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}
