import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  FILE_UPLOADER_TOKEN,
  PRODUCT_REPOSITORY_TOKEN,
} from 'src/common/token';
import { ProductEntity } from 'src/domain/product/product-entity';
import { IProductRepository } from 'src/domain/product/product-repository.interface';
import { IFileUploader } from 'src/domain/shared/file-uploader.interface';

type TUpdateDateProductServicePayload = Partial<
  Pick<ProductEntity, 'name' | 'description' | 'price' | 'stock'>
>;

@Injectable()
export class UpdateProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
    @Inject(FILE_UPLOADER_TOKEN)
    private readonly fileUploaderService: IFileUploader,
  ) {}

  async updateProduct(
    id: string,
    product: TUpdateDateProductServicePayload,
    image: Express.Multer.File,
  ): Promise<ProductEntity> {
    const productExist = await this.productRepository.getProductById(id);
    if (!productExist) throw new NotFoundException('Product not found');

    let newImageUrl = '';
    let newImageId = '';

    try {
      if (image) {
        const response = await this.fileUploaderService.upload(image);
        if (response) {
          newImageUrl = response.url;
          newImageId = response.id;
        }
      }

      const updatedProduct = productExist.update({
        ...product,
        ...(newImageId && { imageId: newImageId, imageUrl: newImageUrl }),
      });

      const savedProduct = await this.productRepository.updateProduct(
        id,
        updatedProduct,
      );

      // delete the old image if it exists
      if (image && productExist.imageId) {
        void this.fileUploaderService
          .delete(productExist.imageId)
          .catch((error) => {
            console.error('Failed to delete old image', error);
          });
      }

      // return the updated product
      return savedProduct;
    } catch (error) {
      // deleting new image when product update fails
      if (newImageId) {
        void this.fileUploaderService.delete(newImageId).catch((error) => {
          console.error('Failed to delete new image', error);
        });
      }

      throw error;
    }
  }
}
