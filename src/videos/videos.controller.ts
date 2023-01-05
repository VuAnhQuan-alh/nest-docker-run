import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ResponseDto } from '../commons/data.transfer.objects';
import { VideosDoc } from './videos.schema';
import { JwtAuthGuard } from '../commons/guards/jwt.auth.guard';
import { RolesGuard } from '../commons/guards/roles.guard';
import { Roles } from '../commons/decorators/roles.decrators';
import { RolesEnum } from '../commons/constants';
import { Payload } from '../commons/decorators/payload.decrators';
import { Queries } from '../commons/decorators/query.decrators';
import { QueriesVideoDto } from './dto/queries-video.dto';

@Controller('videos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @Roles(RolesEnum.SupperAdmin, RolesEnum.Editor)
  create(
    @Body(new ValidationPipe()) createVideoDto: CreateVideoDto,
    @Payload('sub') sub: string,
  ): Promise<ResponseDto<VideosDoc>> {
    return this.videosService.create(createVideoDto, sub);
  }

  @Get()
  findAll(
    @Queries(['search', 'page', 'pageSize']) queries: QueriesVideoDto,
  ): Promise<ResponseDto<VideosDoc[]>> {
    return this.videosService.findByUser(queries);
  }

  @Get('owner')
  findByOwner(@Payload('sub') sub: string): Promise<ResponseDto<VideosDoc[]>> {
    return this.videosService.findByOwner(sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponseDto<VideosDoc>> {
    return this.videosService.findOne(id);
  }

  @Put(':id')
  @Roles(RolesEnum.SupperAdmin, RolesEnum.Editor)
  update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
    @Payload('sub') sub: string,
  ): Promise<ResponseDto> {
    return this.videosService.update(id, updateVideoDto, sub);
  }

  @Delete(':id')
  @Roles(RolesEnum.Editor)
  remove(
    @Param('id') id: string,
    @Payload('sub') sub: string,
  ): Promise<ResponseDto> {
    return this.videosService.remove(id, sub);
  }

  @Get('hidden/:id')
  @Roles(RolesEnum.SupperAdmin)
  hidden(@Param('id') id: string): Promise<ResponseDto<any>> {
    return this.videosService.hiddenVideo(id);
  }
}
