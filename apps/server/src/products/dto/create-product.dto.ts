import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Smartphone X',
  })
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Latest smartphone with advanced features',
  })
  description: string;

  @ApiProperty({
    description: 'Product price',
    example: 999.99,
    minimum: 0,
  })
  price: number;

  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/images/smartphone.jpg',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    description: 'Product stock quantity',
    example: 100,
    minimum: 0,
    default: 0,
  })
  stock: number;
}
