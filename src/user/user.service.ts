import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll() {
    const users = await this.userModel
      .find(
        {},
        {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          isDriver: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      )
      .exec();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById({ _id: id }).exec();
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;

    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      return {
        message: 'User not found',
        statusCode: 404,
      };
    }

    // 6-30 digits must include numbers, and accepts special characters
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{6,30}$/;
    if (
      updateUserDto.password &&
      !PASSWORD_REGEX.test(updateUserDto.password)
    ) {
      return {
        message: 'Password must be 6-30 digits and include numbers',
        statusCode: 400,
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
    updateUserDto.password = hashedPassword;

    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();

    return updatedUser;
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      return {
        message: 'User not found',
        statusCode: 404,
      };
    }

    const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();
    return deletedUser;
  }
}
