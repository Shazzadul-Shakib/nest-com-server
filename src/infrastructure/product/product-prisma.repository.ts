import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ProductEntity } from 'src/domain/product/product-entity';
import { IProductRepository } from 'src/domain/product/product-repository.interface';

type TProductModel = Prisma.ProductsGetPayload<{
    select: {
      id: true;
      name: true;
      description: true;
      price: true;
      stock: true;
      imageUrl: true;
      imageId: true;
    };
  }>;

@Injectable()
export class ProductPrismaRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    const prismaProduct= await this.prisma.products.create({
        data:product.toPersistence(),
    });

    return this.toDomain(prismaProduct)
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    const prismaProducts = await this.prisma.products.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        imageUrl: true,
        imageId: true,
      },
    });

    return prismaProducts.map((product) => this.toDomain(product));
  }



  // helper methods
  private toDomain(product: TProductModel): ProductEntity {
    return ProductEntity.create({
      id: product.id,
      name: product.name,
      description:product.description,
      price:product.price,
      stock:product.stock,
      imageUrl:product.imageUrl ?? "",
      imageId:product.imageId?? ""

    });
  }
}
