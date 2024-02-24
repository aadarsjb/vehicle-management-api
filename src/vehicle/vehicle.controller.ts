import {
  Get,
  Controller,
  Body,
  Post,
  UseGuards,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { stringify } from 'querystring';

@Controller('product')
@UseGuards(RoleGuard)
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Post('/add')
  createVehicle(@Body() vehicle: CreateVehicleDto, @Req() req) {
    const id: string = req.user.id;
    console.log(vehicle);
    return this.vehicleService.createNewVehicle(vehicle, id);
  }
  @Get('/get')
  getVehicle() {
    return this.vehicleService.getAllVehicle();
  }
  @Get('/get/:id')
  getVehicleById(id: string) {
    return this.vehicleService.getVehicleById(id);
  }
  @Patch('/update/:id')
  updateVehicle(@Body() vehicle: CreateVehicleDto, @Req() req, id: string) {
    return this.vehicleService.updateVehicleById(id, vehicle);
  }
  @Delete('/delete/:id')
  deleteVehicle(id: string) {
    return this.vehicleService.deleteVehicleById(id);
  }

  //later adding other routes
}
