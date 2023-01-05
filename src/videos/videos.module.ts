import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Videos, VideosSchema } from './videos.schema';
import { Comments, CommentsSchema } from '../comments/comments.schema';
import { Favorites, FavoritesSchema } from '../favorites/favorites.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Videos.name, schema: VideosSchema },
      { name: Comments.name, schema: CommentsSchema },
      { name: Favorites.name, schema: FavoritesSchema },
    ]),
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
