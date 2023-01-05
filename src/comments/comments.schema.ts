import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Users } from '../users/users.schema';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'comments' })
export class Comments {
  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  isEdit: boolean;

  @Prop({ required: true })
  modelId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Users.name })
  ownerId: Users;
}

export type CommentsDoc = HydratedDocument<Comments>;
export const CommentsSchema = SchemaFactory.createForClass(Comments);
