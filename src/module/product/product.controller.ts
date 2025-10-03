import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImageValidationPipe } from 'src/common/pipes/image-validation-pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductService } from './application/create-product.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { GetAllProductsService } from './application/get-all-products.service';
import { GetProductService } from './application/get-product.service';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly getAllProductsService: GetAllProductsService,
    private readonly getProductsService: GetProductService,
  ) {}

  @Roles('Admin')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 1 * 1024 * 1024 },
    }),
  )
  async createProduct(
    @UploadedFile(ImageValidationPipe())
    file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const response = await this.createProductService.createProduct(
      createProductDto,
      file,
    );
    return ApiResponseDto.success('Product created successfully', response);
  }

  @Roles('Admin', 'Customer')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProducts() {
    const products = await this.getAllProductsService.getAllProducts();
    return ApiResponseDto.success('Products retrieved successfully', products);
  }

  @Roles('Admin', 'Customer')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProductById(@Param('id') id: string) {
    const product = await this.getProductsService.getProductById(id);
    return ApiResponseDto.success('Product retrieved successfully', product);
  }
}
