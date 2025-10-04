import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from 'src/domain/cart/cart.repository.interface';
import { CartEntity } from 'src/domain/cart/cart-entity';
import { CartItemEntity } from 'src/domain/cart/cart-item-entity';
import { IIDGenerator } from 'src/domain/shared/id-generator.interface';
import { CART_REPOSITORY_TOKEN, ID_GENERATOR_TOKEN } from 'src/common/token';

type TAddToCartPayload = {
  productId: string;
  quantity: number;
};

@Injectable()
export class AddToCartService {
  constructor(
    @Inject(CART_REPOSITORY_TOKEN)
    private readonly cartRepository: ICartRepository,

    @Inject(ID_GENERATOR_TOKEN)
    private readonly idGenerator: IIDGenerator,
  ) {}

  async execute(
    payload: TAddToCartPayload,
    userId: string,
  ): Promise<CartEntity> {
    // 1. Find existing cart by user
    let cart = await this.cartRepository.findByUserId(userId);

    // 2. If user has no cart yet, create one
    if (!cart) {
      cart = CartEntity.create({
        id: this.idGenerator.generate(),
        userId,
        items: [],
      });
    }

    // 3. Check if item already exists in cart
    const existingItem = cart.items.find(
      (item) => item.productId === payload.productId,
    );

    if (existingItem) {
      existingItem.quantity += payload.quantity;
    } else {
      const newItem = CartItemEntity.create({
        id: this.idGenerator.generate(),
        cartId: cart.id,
        productId: payload.productId,
        quantity: payload.quantity,
      });
      cart.items.push(newItem);
    }

    // 4. Save cart
    return this.cartRepository.update(cart);
  }
}
