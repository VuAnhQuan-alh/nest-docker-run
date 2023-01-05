import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from '../users/users.schema';

@Schema({ timestamps: true, collection: 'favorites' })
export class Favorites {
  @Prop({ required: true })
  modelId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Users.name })
  ownerId: Users;
}

export type FavoritesDoc = HydratedDocument<Favorites>;
export const FavoritesSchema = SchemaFactory.createForClass(Favorites);
