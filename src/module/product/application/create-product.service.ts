import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/domain/product/product-entity';
import { IProductRepository } from 'src/domain/product/product-repository.interface';
import { IFileUploader } from 'src/domain/shared/file-uploader.interface';
import { IIDGenerator } from 'src/domain/shared/id-generator.interface';

type TCreateProductServicePayload = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

@Injectable()
export class CreateProductService {
  constructor(
    private readonly prodctRepository: IProductRepository,
    private readonly fileUploader: IFileUploader,
    private readonly idGenerator: IIDGenerator,
  ) {}

  async createProduct(
    payload: TCreateProductServicePayload,
    imageFile: Express.Multer.File,
  ) {
    let imageUrl = '';
    let imageId = '';

    try {
      if (imageFile) {
        const response = await this.fileUploader.upload(imageFile);
        if (response) {
          imageUrl = response.url;
          imageId = response.id;
        }
      }

      const product = ProductEntity.create({
        id: this.idGenerator.generate(),
        ...payload,
        imageUrl,
        imageId,
      });

      return await this.prodctRepository.createProduct(product);
    } catch (error) {
      if (imageId) {
        void this.fileUploader
          .delete(imageId)
          .catch((error) => console.error('Failed to delete image', error));
      }
      throw error;
    }
  }
}
