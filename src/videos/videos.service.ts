import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PayloadDto, ResponseDto } from '../commons/data.transfer.objects';
import { Videos, VideosDoc } from './videos.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments, CommentsDoc } from '../comments/comments.schema';
import { Favorites, FavoritesDoc } from '../favorites/favorites.schema';
import { QueriesVideoDto } from './dto/queries-video.dto';
import { Constants } from '../commons/constants';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Videos.name) private readonly videosModel: Model<VideosDoc>,
    @InjectModel(Comments.name)
    private readonly commentsModel: Model<CommentsDoc>,
    @InjectModel(Favorites.name)
    private readonly favoritesModel: Model<FavoritesDoc>,
  ) {}
  async create(
    data: CreateVideoDto,
    ownerId: string,
  ): Promise<ResponseDto<VideosDoc>> {
    try {
      const result = await this.videosModel.create({
        ...data,
        ownerId,
      });
      return { message: 'Created a video successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async findByUser(
    queries: QueriesVideoDto,
  ): Promise<ResponseDto<VideosDoc[]>> {
    try {
      const { search, skip, pageSize } = queries;
      const [result, count] = await Promise.all([
        this.videosModel
          .find({
            title: { $regex: search ?? '' },
            isVisibility: true,
          })
          .skip(skip)
          .limit(pageSize),
        this.videosModel.count(),
      ]);

      return {
        message: 'Get all videos successful!',
        attributes: result,
        count,
      };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async findByOwner(ownerId: string): Promise<ResponseDto<VideosDoc[]>> {
    try {
      const result = await this.videosModel.find({ ownerId });
      return { message: 'Get videos of owner successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async findOne(id: string): Promise<ResponseDto<VideosDoc>> {
    try {
      const result = await this.videosModel.findOne({ _id: id });
      return { message: 'Get a video successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async update(
    id: string,
    updateVideoDto: UpdateVideoDto,
    ownerId: string,
  ): Promise<ResponseDto<any>> {
    try {
      const result = await this.videosModel.updateOne(
        { _id: id, ownerId },
        { $set: updateVideoDto },
      );
      return { message: 'Updated a video successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async hiddenVideo(id: string): Promise<ResponseDto<any>> {
    try {
      const result = await this.videosModel.updateOne({
        _id: id,
        isVisibility: false,
      });
      return {
        message: 'Super admin hidden/visibility video successful!',
        attributes: result,
      };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async remove(id: string, ownerId: string): Promise<ResponseDto<any>> {
    try {
      const [result, ,] = await Promise.all([
        await this.videosModel.deleteOne({
          _id: id,
          ownerId,
        }),
        await this.commentsModel.deleteMany({ modelId: id }),
        await this.favoritesModel.deleteMany({ modelId: id }),
      ]);
      return { message: 'Removed a video successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }
}
