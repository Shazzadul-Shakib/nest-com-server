import { CartEntity } from './cart-entity';

export abstract class ICartRepository {
  abstract findByUserId(userId: string): Promise<CartEntity | null>;
  abstract create(cart: CartEntity): Promise<CartEntity>;
  abstract update(cart: CartEntity): Promise<CartEntity>;
}
