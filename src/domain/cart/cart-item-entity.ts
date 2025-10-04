export type TCartItemProps = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
};

export class CartItemEntity {
  public readonly id: string;
  public readonly cartId: string;
  public readonly productId: string;
  public quantity: number;

  constructor(props: TCartItemProps) {
    this.id = props.id;
    this.cartId = props.cartId;
    this.productId = props.productId;
    this.quantity = props.quantity;
  }

  static create(props: TCartItemProps) {
    return new CartItemEntity(props);
  }

  increase(qty: number) {
    this.quantity += qty;
  }

  decrease(qty: number) {
    this.quantity = Math.max(0, this.quantity - qty);
  }

  toPersistence(): TCartItemProps {
    return {
      id: this.id,
      cartId: this.cartId,
      productId: this.productId,
      quantity: this.quantity,
    };
  }
}
