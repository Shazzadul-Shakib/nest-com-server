import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CreateProductService } from './application/create-product.service';
import {
  FILE_UPLOADER_TOKEN,
  ID_GENERATOR_TOKEN,
  PRODUCT_REPOSITORY_TOKEN,
} from 'src/common/token';
import { ProductPrismaRepository } from 'src/infrastructure/product/product-prisma.repository';
import { CloudinaryFileUploader } from 'src/infrastructure/shared/cloudinary-file-uploader';
import { CryptoIdGenerator } from 'src/infrastructure/shared/crypto-id-generator';
import { GetAllProductsService } from './application/get-all-products.service';
import { GetProductService } from './application/get-product.service';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductService,
    GetAllProductsService,

    { provide: PRODUCT_REPOSITORY_TOKEN, useClass: ProductPrismaRepository },
    { provide: FILE_UPLOADER_TOKEN, useClass: CloudinaryFileUploader },
    { provide: ID_GENERATOR_TOKEN, useClass: CryptoIdGenerator },
    GetProductService,
  ],
})
export class ProductModule {}
