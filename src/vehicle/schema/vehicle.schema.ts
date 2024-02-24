import { Schema, Prop, MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';
enum marking {
  active = 'active',
  retired = 'retired',
  underMaintenance = 'underMaintenance',
}
@Schema()
export class Vehicle {
  @Prop()
  make: string;

  @Prop()
  model: number;
  @Prop()
  year: number;
  @Prop()
  registrationNo: number;
  @Prop(() => marking)
  currentStatus: string;
  @Prop()
  location: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  addedBy: User;
}

export const vehicleSchema = SchemaFactory.createForClass(Vehicle);
