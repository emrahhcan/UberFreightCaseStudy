import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DriverModule } from './driver/driver.module';
import { FavoritesModule } from './favorites/favorites.module';
@Module({
  imports: [
    MongooseModule.forRoot('MONGODB_CONNECTION_STRING'),
    UserModule,
    AuthModule,
    DriverModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
