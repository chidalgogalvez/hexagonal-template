import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryPort } from './user.port';
import { IUser } from '../../domain/user.interface';
import { User, UserDocument } from './user.schema';

@Injectable()
export class MongooseUserRepository implements UserRepositoryPort {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) { }
  create(user: any): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id).exec();
    return user as IUser;
  }
}
