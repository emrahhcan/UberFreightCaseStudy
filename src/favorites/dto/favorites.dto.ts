import { IsString } from 'class-validator';

export class AddFavoriteDriverDto {
  @IsString()
  driver: string;
}

export class RemoveFavoriteDriverDto extends AddFavoriteDriverDto {}
