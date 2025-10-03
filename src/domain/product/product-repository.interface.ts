import { ProductEntity } from './product-entity';

export abstract class IProductRepository {
  abstract createProduct(payload: ProductEntity): Promise<ProductEntity>;
  abstract getAllProducts(): Promise<ProductEntity[]>;
  abstract getProductById(id: string): Promise<ProductEntity>;
}
