import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Product name',
    example: 'Smartphone X Pro',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'Updated smartphone with advanced features',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Product price',
    example: 1099.99,
    minimum: 0,
  })
  price?: number;

  @ApiPropertyOptional({
    description: 'Product image URL',
    example: 'https://example.com/images/smartphone-pro.jpg',
  })
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Product stock quantity',
    example: 50,
    minimum: 0,
  })
  stock?: number;
}
