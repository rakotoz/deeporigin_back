import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login({ username, password }) {
    const user = await this.userModel.findOne({ username });
    if (user && user.password === password) {
      const payload = { sub: user._id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      return null;
    }
  }

  async checkToken(token) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch {
      return null;
    }
  }
}
