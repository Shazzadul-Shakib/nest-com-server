import { Inject, Injectable } from '@nestjs/common';
import { CART_REPOSITORY_TOKEN } from 'src/common/token';
import { ICartRepository } from 'src/domain/cart/cart.repository.interface';

@Injectable()
export class GetCartService {
  constructor(
    @Inject(CART_REPOSITORY_TOKEN)
    private readonly cartRepository: ICartRepository,
  ) {}

  async getCart(userId: string) {
    return this.cartRepository.findByUserId(userId);
  }
}
