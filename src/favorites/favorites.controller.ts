import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { JwtGuard } from 'src/auth/guards/jwtAuth.guard';
import {
  AddFavoriteDriverDto,
  RemoveFavoriteDriverDto,
} from './dto/favorites.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtGuard)
  @Post('add-favorite-driver')
  async addFavoriteDriver(
    @Request() req,
    @Body() addFavoriteDriverDto: AddFavoriteDriverDto,
  ) {
    const user = req.user._id;
    console.log('user', user);
    return await this.favoritesService.addFavoriteDriver(
      user,
      addFavoriteDriverDto,
    );
  }

  @UseGuards(JwtGuard)
  @Get('fetch-favorite-drivers-of-user')
  async fetchFavoriteDriversByUser(@Request() req) {
    const user = req.user._id;
    return await this.favoritesService.fetchFavoriteDriversByUser(user);
  }

  @UseGuards(JwtGuard)
  @Delete('remove-favorite-driver')
  async removeFavoriteDriver(
    @Request() req,
    @Body() removeFavoriteDriverDto: RemoveFavoriteDriverDto,
  ) {
    const user = req.user._id;
    return await this.favoritesService.removeFavoriteDriver(
      user,
      removeFavoriteDriverDto,
    );
  }
}
