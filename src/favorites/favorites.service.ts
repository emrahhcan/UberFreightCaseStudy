import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Favorites } from './schemas/favorites.schema';
import { Model } from 'mongoose';
import {
  AddFavoriteDriverDto,
  RemoveFavoriteDriverDto,
} from './dto/favorites.dto';
import { UserService } from 'src/user/user.service';
import { DriverService } from 'src/driver/driver.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorites.name)
    private readonly favoritesModel: Model<Favorites>,
    private readonly userService: UserService,
    private readonly driverService: DriverService,
  ) {}

  async addFavoriteDriver(
    user: string,
    addFavoriteDriverDto: AddFavoriteDriverDto,
  ) {
    const userExists = await this.userService.findOne(user);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const { driver } = addFavoriteDriverDto;

    const driverExists = await this.driverService.findById(driver);
    if (!driverExists) {
      throw new NotFoundException('Driver not found');
    }

    const existingFavorite = await this.favoritesModel.findOne({
      user,
      driver,
    });
    if (existingFavorite) {
      throw new ConflictException('Driver is already a favorite');
    }

    const favoriteDriver = await this.favoritesModel.create({
      user,
      driver,
    });
    return favoriteDriver;
  }

  async fetchFavoriteDriversByUser(user: string) {
    const userExists = await this.userService.findOne(user);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const favoriteDrivers = await this.favoritesModel
      .find({ user })
      .populate('user', 'firstName lastName email')
      .populate('driver', 'firstName lastName email vehicle')
      .exec();
    return favoriteDrivers;
  }

  async removeFavoriteDriver(
    user: string,
    removeFavoriteDriverDto: RemoveFavoriteDriverDto,
  ) {
    const userExists = await this.userService.findOne(user);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const { driver } = removeFavoriteDriverDto;

    const driverExists = await this.driverService.findById(driver);
    if (!driverExists) {
      throw new NotFoundException('Driver not found');
    }

    const favoriteDriver = await this.favoritesModel.findOneAndDelete({
      user,
      driver,
    });
    if (!favoriteDriver) {
      throw new NotFoundException('Driver not found in favorites');
    }

    return favoriteDriver;
  }
}
