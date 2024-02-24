import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Vehicle } from './schema/vehicle.schema';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: mongoose.Model<Vehicle>,
  ) {}

  async createNewVehicle(data: CreateVehicleDto, id: string) {
    try {
      const vehicle = {
        ...data,
        addedBy: id,
      };
      return await this.vehicleModel.create(vehicle);
    } catch (error) {
      throw new Error('Failed to create vehicle');
    }
  }

  async getAllVehicle() {
    try {
      return await this.vehicleModel.find();
    } catch (error) {
      throw new Error('Failed to retrieve vehicles');
    }
  }

  async getVehicleById(id: string) {
    try {
      const vehicle = await this.vehicleModel.findById(id);
      if (!vehicle) {
        throw new NotFoundException('Vehicle not found');
      }
      return vehicle;
    } catch (error) {
      throw new NotFoundException('Vehicle not found');
    }
  }

  async updateVehicleById(id: string, data: CreateVehicleDto) {
    try {
      const vehicle = await this.vehicleModel.findByIdAndUpdate(id, data);
      if (!vehicle) {
        throw new NotFoundException('Vehicle not found');
      }
      return vehicle;
    } catch (error) {
      throw new Error('Failed to update vehicle');
    }
  }

  async deleteVehicleById(id: string) {
    try {
      const vehicle = await this.vehicleModel.findByIdAndDelete(id);
      if (!vehicle) {
        throw new NotFoundException('Vehicle not found');
      }
      return vehicle;
    } catch (error) {
      throw new Error('Failed to delete vehicle');
    }
  }
}
