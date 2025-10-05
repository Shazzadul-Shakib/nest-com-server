import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AddToCartDto } from './dto/add-cart.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { AddToCartService } from './application/add-cart.service';
import { GetCartService } from './application/get-cart.service';

@Controller('carts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CartController {
  constructor(
    private readonly cartService: AddToCartService,
    private readonly getCartService: GetCartService,
  ) {}

  @Roles('Customer')
  @Post()
  async addCart(@Body() cartDto: AddToCartDto, @Req() req: any) {
    const { id: userId } = req.user;
    const response = await this.cartService.execute(cartDto, userId);
    return ApiResponseDto.success('Item added to cart successfully', response);
  }

  @Roles('Customer')
  @Get()
  async getCart(@Req() req: any) {
    const { id: userId } = req.user;
    const response = await this.getCartService.getCart(userId);
    return ApiResponseDto.success('Cart retrieved successfully', response);
  }
}
