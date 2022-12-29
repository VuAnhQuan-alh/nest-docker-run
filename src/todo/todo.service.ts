import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDoc } from './todo.schema';
import { Model } from 'mongoose';
import { PayloadDto, ResponseDto } from '../commons/data.transfer.objects';
import { QueryTodoDto } from './dto/query-todo.dto';
import { Constants, parserQueries } from '../commons/constants';
import { Users } from '../users/users.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDoc>,
  ) {}

  async create(
    data: CreateTodoDto,
    payload: PayloadDto,
  ): Promise<ResponseDto<TodoDoc>> {
    try {
      const { sub } = payload;
      const result = await this.todoModel.create({ ...data, ownerId: sub });

      return { message: 'Created a todo successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async findAll(
    query: QueryTodoDto,
    payload: PayloadDto,
  ): Promise<ResponseDto<TodoDoc[]>> {
    try {
      const { sub } = payload;
      const { page, pageSize, content, ...some } = query;

      const queries = parserQueries(some);
      const skip = (+page - 1) * (+pageSize || Constants.pageSize);

      const [result, count] = await Promise.all([
        this.todoModel
          .find({
            ...queries,
            ownerId: sub,
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

  async update(id: string, data: UpdateTodoDto): Promise<ResponseDto<any>> {
    try {
      const result = await this.todoModel.updateOne(
        { _id: id },
        { $set: data },
      );
      return { message: 'Updated a todo successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async remove(id: string, payload: PayloadDto): Promise<ResponseDto<any>> {
    try {
      const { sub } = payload;
      const result = await this.todoModel.deleteOne({ _id: id, ownerId: sub });
      return { message: 'Deleted a todo successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }
}
