import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ResponseDto } from '../commons/data.transfer.objects';
import { CommentsDoc } from './comments.schema';
import { JwtAuthGuard } from '../commons/guards/jwt.auth.guard';
import { RolesGuard } from '../commons/guards/roles.guard';
import { Payload } from '../commons/decorators/payload.decrators';

@Controller('comments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Payload('sub') sub: string,
  ): Promise<ResponseDto<CommentsDoc>> {
    return this.commentsService.create(createCommentDto, sub);
  }

  @Get(':id')
  findAll(@Param('id') modelId: string): Promise<ResponseDto<CommentsDoc[]>> {
    return this.commentsService.findAll(modelId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Payload('sub') sub: string,
  ): Promise<ResponseDto<any>> {
    return this.commentsService.update(id, updateCommentDto, sub);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Payload('sub') sub: string,
  ): Promise<ResponseDto<any>> {
    return this.commentsService.remove(id, sub);
  }
}
