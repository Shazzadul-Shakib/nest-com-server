import { Body, Controller, Post, UploadedFile } from '@nestjs/common';
import { ImageValidationPipe } from 'src/common/pipes/image-validation-pipe';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {

    @Post()
    async createProduct(
        @UploadedFile(ImageValidationPipe())
        file:Express.Multer.File,
        @Body() createProductDto:CreateProductDto,
     ){
        
    }

}
