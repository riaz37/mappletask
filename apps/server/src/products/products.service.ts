import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(limit?: number, offset?: number) {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      ...(limit ? { take: limit } : {}),
      ...(offset ? { skip: offset } : {}),
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    console.log('Creating product with data:', createProductDto);
    
    // Ensure required fields are present
    if (!createProductDto.name) {
      throw new Error('Product name is required');
    }
    
    if (createProductDto.price === undefined || createProductDto.price === null) {
      throw new Error('Product price is required');
    }
    
    // Set default values if not provided
    const quantity = createProductDto.quantity ?? 0;
    const status = createProductDto.status ?? (quantity > 0 ? 'in_stock' : 'out_of_stock');
    
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        quantity: quantity,
        status: status,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    // Check if product exists
    const product = await this.findOne(id);
    
    // Prepare update data
    const updateData: any = {};
    
    if (updateProductDto.name !== undefined) {
      updateData.name = updateProductDto.name;
    }
    
    if (updateProductDto.price !== undefined) {
      updateData.price = updateProductDto.price;
    }
    
    if (updateProductDto.quantity !== undefined) {
      updateData.quantity = updateProductDto.quantity;
      
      // Update status based on quantity if status is not explicitly provided
      if (updateProductDto.status === undefined) {
        updateData.status = updateProductDto.quantity > 0 ? 'in_stock' : 'out_of_stock';
      }
    }
    
    if (updateProductDto.status !== undefined) {
      updateData.status = updateProductDto.status;
    }
    
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
      return { success: true };
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
