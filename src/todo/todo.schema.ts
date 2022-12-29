import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from '../users/users.schema';

export type TodoDoc = HydratedDocument<Todo>;

@Schema({ timestamps: true, collection: 'todo' })
export class Todo {
  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  isDone: boolean;

  @Prop({ default: new Date() })
  createdOfDate: Date;

  @Prop({ type: Types.ObjectId, ref: Users.name })
  ownerId: Users;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
