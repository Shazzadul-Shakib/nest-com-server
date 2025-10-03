import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name has to be string' })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'description is required' })
  @IsString({ message: 'description has to be string' })
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty({ message: 'price is required' })
  @IsNumber({}, { message: 'price has to be a number' })
  @IsPositive({ message: 'price has to be a positive number' })
  price?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty({ message: 'stock is required' })
  @IsNumber({}, { message: 'stock has to be a number' })
  @IsPositive({ message: 'stock has to be a positive number' })
  stock?: number;
}
