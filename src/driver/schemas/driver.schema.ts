import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DriverDocument = HydratedDocument<Driver>;

@Schema({ timestamps: true })
export class Driver {
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
    default: true,
  })
  isDriver: boolean;

  @Prop({
    type: {
      brand: { type: String, required: true },
      model: { type: String, required: true },
      year: { type: Number, required: true },
    },
    _id: false,
    required: true,
  })
  vehicle: { brand: string; model: string; year: number };
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
