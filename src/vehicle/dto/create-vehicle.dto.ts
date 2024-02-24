import { IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  title;

  @IsNumber()
  price;
}
