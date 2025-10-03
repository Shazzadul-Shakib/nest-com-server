import { Inject, Injectable } from '@nestjs/common';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { PRODUCT_REPOSITORY_TOKEN } from 'src/common/token';
import { IProductRepository } from 'src/domain/product/product-repository.interface';

@Injectable()
export class DeleteProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
  ) {}

  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.deleteProduct(id);
  }
}
