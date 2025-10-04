import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { AddToCartService } from './application/add-cart.service';
import { CART_REPOSITORY_TOKEN, ID_GENERATOR_TOKEN } from 'src/common/token';
import { PrismaCartRepository } from 'src/infrastructure/cart/cart-prisma.repository';
import { CryptoIdGenerator } from 'src/infrastructure/shared/crypto-id-generator';

@Module({
  controllers: [CartController],
  providers: [AddToCartService,
     // ✅ Register repository under token
     {
      provide: CART_REPOSITORY_TOKEN,
      useClass: PrismaCartRepository,
    },

    // ✅ Register ID generator
    {
      provide: ID_GENERATOR_TOKEN,
      useClass: CryptoIdGenerator,
    },
  ],

})
export class CartModule {}
