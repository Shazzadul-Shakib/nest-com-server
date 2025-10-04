import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CartEntity } from "src/domain/cart/cart-entity";
import { CartItemEntity } from "src/domain/cart/cart-item-entity";
import { ICartRepository } from "src/domain/cart/cart.repository.interface";

@Injectable()
export class PrismaCartRepository implements ICartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<CartEntity | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { CartItem: true },
    });

    if (!cart) return null;

    return CartEntity.create({
      id: cart.id,
      userId: cart.userId,
      items: cart.CartItem.map((item) =>
        CartItemEntity.create({
          id: item.id,
          cartId: item.cartId,
          productId: item.productId,
          quantity: item.quantity,
        }),
      ),
    });
  }

  async create(cart: CartEntity): Promise<CartEntity> {
    const created = await this.prisma.cart.create({
      data: {
        id: cart.id,
        userId: cart.userId,
        CartItem: {
          create: cart.items.map((i) => ({
            id: i.id,
            productId: i.productId,
            quantity: i.quantity,
          })),
        },
      },
      include: { CartItem: true },
    });

    return CartEntity.create({
      id: created.id,
      userId: created.userId,
      items: created.CartItem.map((i) =>
        CartItemEntity.create({
          id: i.id,
          cartId: i.cartId,
          productId: i.productId,
          quantity: i.quantity,
        }),
      ),
    });
  }

  async update(cart: CartEntity): Promise<CartEntity> {
    const result = await this.prisma.cart.upsert({
      where: { id: cart.id },
      create: {
        id: cart.id,
        userId: cart.userId,
        CartItem: {
          create: cart.items.map((i) => ({
            id: i.id,
            productId: i.productId,
            quantity: i.quantity,
          })),
        },
      },
      update: {
        CartItem: {
          deleteMany: {}, // remove old items
          create: cart.items.map((i) => ({
            id: i.id,
            productId: i.productId,
            quantity: i.quantity,
          })),
        },
      },
      include: { CartItem: true },
    });

    return CartEntity.create({
      id: result.id,
      userId: result.userId,
      items: result.CartItem.map((i) =>
        CartItemEntity.create({
          id: i.id,
          cartId: i.cartId,
          productId: i.productId,
          quantity: i.quantity,
        }),
      ),
    });
  }
}
