import { CartItemEntity } from "./cart-item-entity";

export type TCartItemProps = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
};

export type TCartProps = {
  id: string;
  userId: string;
  items: CartItemEntity[];
};

export class CartEntity {
  public readonly id: string;
  public userId: string;
  public items: CartItemEntity[] = [];

  constructor(props: TCartProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.items = props.items;
  }

  static create(props: TCartProps): CartEntity {
    return new CartEntity(props);
  }

  addItem(item: CartItemEntity) {
    const existing = this.items.find((i) => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  removeItem(productId: string) {
    this.items = this.items.filter((i) => i.productId !== productId);
  }

  clear() {
    this.items = [];
  }
  

  toPersistence(): TCartProps {
    return {
      id: this.id,
      userId: this.userId,
      items: this.items,
    };
  }

  toResponse(): TCartProps {
    return {
      id: this.id,
      userId: this.userId,
      items: this.items,
    };
  }
}