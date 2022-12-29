import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Request } from 'express';
import { PayloadDto } from '../commons/data.transfer.objects';
import { JwtAuthGuard } from '../commons/guards/jwt.auth.guard';
import { QueryTodoDto } from './dto/query-todo.dto';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createTodoDto: CreateTodoDto,
    @Req() request: Request,
  ) {
    const payload = request.user as PayloadDto;
    return this.todoService.create(createTodoDto, payload);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe()) query: QueryTodoDto,
    @Req() request: Request,
  ) {
    const payload = request.user as PayloadDto;
    return this.todoService.findAll(query, payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    const payload = request.user as PayloadDto;
    return this.todoService.remove(id, payload);
  }
}
