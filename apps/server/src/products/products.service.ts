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
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        quantity: createProductDto.stock || 0,
        status: createProductDto.stock > 0 ? 'in_stock' : 'out_of_stock',
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
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
