import { ForbiddenException, Injectable } from '@nestjs/common';
import { ResponseDto } from '../commons/data.transfer.objects';
import { Favorites, FavoritesDoc } from './favorites.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorites.name)
    private readonly favoritesModel: Model<FavoritesDoc>,
  ) {}

  async create(
    modelId: string,
    ownerId: string,
  ): Promise<ResponseDto<FavoritesDoc>> {
    try {
      const result = await this.favoritesModel.create({ modelId, ownerId });
      return { message: 'Created a favorites successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async findAll(id: string): Promise<ResponseDto<FavoritesDoc[]>> {
    try {
      const result = await this.favoritesModel.find({ modelId: id });
      return { message: 'Get all favorites successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async remove(modelId: string, ownerId: string): Promise<ResponseDto<any>> {
    try {
      const result = await this.favoritesModel.deleteOne({ modelId, ownerId });
      return { message: 'Unfavorite a model successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }
}
