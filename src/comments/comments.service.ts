import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments, CommentsDoc } from './comments.schema';
import { ResponseDto } from '../commons/data.transfer.objects';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private readonly commentModel: Model<CommentsDoc>,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    ownerId: string,
  ): Promise<ResponseDto<CommentsDoc>> {
    try {
      const result = await this.commentModel.create({
        ...createCommentDto,
        ownerId,
      });
      return { message: 'Created a comments successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async findAll(modelId: string): Promise<ResponseDto<CommentsDoc[]>> {
    try {
      const result = await this.commentModel.find({ modelId: modelId });
      return { message: 'Get comments successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
    ownerId: string,
  ): Promise<ResponseDto<any>> {
    try {
      const result = await this.commentModel.updateOne(
        { _id: id, ownerId },
        { $set: updateCommentDto },
      );
      return { message: 'Updated a comment successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async remove(id: string, ownerId: string): Promise<ResponseDto<any>> {
    try {
      const result = await this.commentModel.deleteOne({
        _id: id,
        ownerId,
      });
      return { message: 'Remove a comment successful!', attributes: result };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }
}
