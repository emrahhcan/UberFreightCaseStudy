import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FavoritesDocument = HydratedDocument<Favorites>;

@Schema({ timestamps: true })
export class Favorites {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  })
  driver: string;
}

export const FavoritesSchema = SchemaFactory.createForClass(Favorites);
