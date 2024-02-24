import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';
import mongoose from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
//constants
const SALT_ROUNDS = 8;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto) {
    const findUser = await this.userService.findByEmail(user.email);

    if (findUser) {
      return 'email already exist, choose a unique email';
    }

    let password = user.password;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    password = hashedPassword;
    user.password = password;

    return await this.userService.createNewUser(user);
  }

  async login(email: string, password: string) {
    const findUser = await this.userService.findByEmail(email);
    console.log('working till here');
    if (!findUser) {
      return 'user not found of the given email';
    }
    const isValid = await bcrypt.compare(password, findUser.password);
    console.log(isValid);
    if (!isValid) {
      throw new BadRequestException('username password mismatch');
    }
    const payload = {
      id: findUser.id,
      email: findUser.email,
      roles: findUser.roles,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
