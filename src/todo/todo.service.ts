import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDoc } from './todo.schema';
import { Model } from 'mongoose';
import { ResponseDto } from '../commons/data.transfer.objects';
import { QueryTodoDto } from './dto/query-todo.dto';
import { Constants, parserQueries } from '../commons/constants';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDoc>,
  ) {}

  async create(
    data: CreateTodoDto,
    ownerId: string,
  ): Promise<ResponseDto<TodoDoc>> {
    try {
      const result = await this.todoModel.create({ ...data, ownerId });

      return { message: 'Created a todo successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async findAll(
    query: QueryTodoDto,
    ownerId: string,
  ): Promise<ResponseDto<TodoDoc[]>> {
    try {
      const { page, pageSize, content, ...some } = query;

      const queries = parserQueries(some);
      const skip = (+page - 1) * (+pageSize || Constants.pageSize);

      const [result, count] = await Promise.all([
        this.todoModel
          .find({
            ...queries,
            ownerId,
            content: { $regex: content ?? '' },
          })
          .skip(skip || 0)
          .limit(+pageSize || Constants.pageSize),
        this.todoModel.count(),
      ]);

      return { message: 'Get all todo successful!', attributes: result, count };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async findOne(id: string): Promise<ResponseDto<TodoDoc>> {
    try {
      const result = await this.todoModel.findOne({ _id: id });
      return { message: 'Get a todo successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async update(
    id: string,
    data: UpdateTodoDto,
    ownerId: string,
  ): Promise<ResponseDto<any>> {
    try {
      const result = await this.todoModel.updateOne(
        { _id: id, ownerId },
        { $set: data },
      );
      return { message: 'Updated a todo successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async remove(id: string, ownerId: string): Promise<ResponseDto<any>> {
    try {
      const result = await this.todoModel.deleteOne({ _id: id, ownerId });
      return { message: 'Deleted a todo successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }
}
