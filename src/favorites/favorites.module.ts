import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorites, FavoritesSchema } from './favorites.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorites.name, schema: FavoritesSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
