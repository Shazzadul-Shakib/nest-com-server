import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY_TOKEN } from 'src/common/token';
import { IProductRepository } from 'src/domain/product/product-repository.interface';

@Injectable()
export class GetAllProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
  ) {}

  async getAllProducts(){
    const products=await this.productRepository.getAllProducts();
    return products.map((product) => product.toResponse());
  }
}
