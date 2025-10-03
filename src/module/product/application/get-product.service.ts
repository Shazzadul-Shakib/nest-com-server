import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY_TOKEN } from 'src/common/token';
import { IProductRepository } from 'src/domain/product/product-repository.interface';

@Injectable()
export class GetProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
  ) {}

  async getProductById(id: string) {
    const product = await this.productRepository.getProductById(id);
    return product.toResponse();
  }
}
