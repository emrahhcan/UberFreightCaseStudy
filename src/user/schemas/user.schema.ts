import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default: false,
  })
  isDriver: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
