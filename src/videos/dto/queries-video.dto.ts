import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../commons/data.transfer.objects';

export class QueriesVideoDto extends PaginationDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  ownerId?: string;
}
