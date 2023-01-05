import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  uri: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}
