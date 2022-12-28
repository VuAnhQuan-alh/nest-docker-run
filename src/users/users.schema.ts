import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RolesEnum } from '../commons/constants';
import { Exclude } from 'class-transformer';

export type UsersDoc = HydratedDocument<Users>;

@Schema({ timestamps: true, collection: 'users' })
export class Users {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  hash_password: string;

  @Prop({ default: null })
  avatar: string | null;

  @Prop({ default: null })
  content: string | null;

  @Prop({ default: false })
  confirmed: boolean;

  @Prop({ default: [RolesEnum.User] })
  @Exclude()
  roles: string[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
