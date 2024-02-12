import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Driver } from './schemas/driver.schema';
import { CreateDriverDto } from './dto/driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name) private readonly driverModel: Model<Driver>,
  ) {}

  async getDrivers() {
    const drivers = await this.driverModel
      .find(
        {},
        {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          isDriver: 1,
          vehicle: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      )
      .exec();
    return drivers;
  }

  async createDriver(createDriverDto: CreateDriverDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createDriverDto.password, salt);
      createDriverDto.password = hashedPassword;
      const createdDriver = await this.driverModel.create(createDriverDto);
      return createdDriver;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findById(id: string) {
    const driver = await this.driverModel.findById(id).exec();
    return driver;
  }
}
