import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../commons/guards/jwt.auth.guard';
import { QueryTodoDto } from './dto/query-todo.dto';
import { Payload } from '../commons/decorators/payload.decrators';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createTodoDto: CreateTodoDto,
    @Payload('sub') sub: string,
  ) {
    return this.todoService.create(createTodoDto, sub);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe()) query: QueryTodoDto,
    @Payload('sub') sub: string,
  ) {
    return this.todoService.findAll(query, sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTodoDto: UpdateTodoDto,
    @Payload('sub') sub: string,
  ) {
    return this.todoService.update(id, updateTodoDto, sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Payload('sub') sub: string) {
    return this.todoService.remove(id, sub);
  }
}
