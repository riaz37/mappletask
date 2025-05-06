import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Product name',
    example: 'Smartphone X Pro',
  })
  @IsOptional()
  @IsString({ message: 'Product name must be a string' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Product price',
    example: 1099.99,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Product price must be a number' })
  @Min(0, { message: 'Product price must be greater than or equal to 0' })
  price?: number;

  @ApiPropertyOptional({
    description: 'Product quantity',
    example: 50,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Product quantity must be a number' })
  @Min(0, { message: 'Product quantity must be greater than or equal to 0' })
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Product status',
    example: 'in_stock',
    enum: ['in_stock', 'out_of_stock'],
  })
  @IsOptional()
  @IsString({ message: 'Product status must be a string' })
  status?: string;
}
