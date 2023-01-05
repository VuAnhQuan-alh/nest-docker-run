import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from '../users/users.schema';

@Schema({ timestamps: true, collection: 'videos' })
export class Videos {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  uri: string;

  @Prop({ default: null })
  description: string | null;

  @Prop({ type: Types.ObjectId, ref: Users.name })
  ownerId: Users;

  @Prop({ default: true })
  isVisibility: boolean;
}

export type VideosDoc = HydratedDocument<Videos>;
export const VideosSchema = SchemaFactory.createForClass(Videos);
