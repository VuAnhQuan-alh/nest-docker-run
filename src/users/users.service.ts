import { ForbiddenException, Injectable } from '@nestjs/common';
import { Users, UsersDoc } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PayloadDto, ResponseDto } from '../commons/data.transfer.objects';
import { DataAccountDto } from '../auth/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDoc>,
  ) {}

  async handlerProfile(data: PayloadDto): Promise<ResponseDto<DataAccountDto>> {
    try {
      const { sub } = data;
      const { _id, email, username, avatar, content, confirmed, roles } =
        await this.usersModel.findOne({ _id: sub });

      return {
        message: 'Get profile idol successful!',
        attributes: { _id, email, username, avatar, content, confirmed, roles },
      };
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }
}
