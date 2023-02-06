import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { Favorites } from 'src/favorites/favorites.schema';
import { Users } from 'src/users/users.schema';

@Schema({ timestamps: true, collection: 'videos' })
export class Videos {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  uri: string;

  @Prop({ default: null })
  description: string | null;

  @Prop({ default: true })
  isVisibility: boolean;

  @Prop({ type: Types.ObjectId, ref: Users.name })
  @Type(() => Users)
  ownerId: Users;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Favorites.name }],
  })
  @Type(() => Favorites)
  favoritesId: Favorites;
}

export type VideosDoc = HydratedDocument<Videos>;
export const VideosSchema = SchemaFactory.createForClass(Videos);
