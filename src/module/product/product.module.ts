import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CreateProductService } from './application/create-product.service';

@Module({
  controllers: [ProductController],
  providers: [CreateProductService],
})
export class ProductModule {}
