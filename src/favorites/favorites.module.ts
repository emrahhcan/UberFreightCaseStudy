import { Module } from '@nestjs/common';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorites, FavoritesSchema } from './schemas/favorites.schema';
import { UserService } from 'src/user/user.service';
import { DriverService } from 'src/driver/driver.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Driver, DriverSchema } from 'src/driver/schemas/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Driver.name, schema: DriverSchema },
      { name: Favorites.name, schema: FavoritesSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, UserService, DriverService],
})
export class FavoritesModule {}
