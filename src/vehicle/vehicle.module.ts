import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, vehicleSchema } from './schema/vehicle.schema';
import { AuthModule } from 'src/auth/auth.module';
import { JwtMiddleware } from 'src/auth/middlewares/jwt.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: vehicleSchema }]),
    AuthModule,
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('vehicle');
  }
}
