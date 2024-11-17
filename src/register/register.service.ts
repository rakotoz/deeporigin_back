import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RegisterService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  async register({ username, password }) {
    const newUser = this.userModel.create({ username, password });
    return newUser;
  }

  async getUser({ username }) {
    const user = this.userModel.findOne({ username });
    return user;
  }
}
