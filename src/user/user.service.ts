import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';
import { IsEmail } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}
  async createNewUser(user) {
    return await this.userModel.create(user);
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
