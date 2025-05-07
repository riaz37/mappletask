import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Smartphone X',
  })
  @IsNotEmpty({ message: 'Product name is required' })
  @IsString({ message: 'Product name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Product price',
    example: 999.99,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'Product price is required' })
  @IsNumber({}, { message: 'Product price must be a number' })
  @Min(0, { message: 'Product price must be greater than or equal to 0' })
  price: number;

  @ApiProperty({
    description: 'Product quantity',
    example: 100,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Product quantity must be a number' })
  @Min(0, { message: 'Product quantity must be greater than or equal to 0' })
  quantity?: number;

  @ApiProperty({
    description: 'Product status',
    example: 'in_stock',
    enum: ['in_stock', 'out_of_stock'],
    default: 'out_of_stock',
  })
  @IsOptional()
  @IsString({ message: 'Product status must be a string' })
  status?: string;
}
