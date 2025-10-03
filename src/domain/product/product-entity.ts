export type TProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  imageId: string;
};

type TProductResponse = Pick<
  TProductProps,
  'id' | 'name' | 'description' | 'imageUrl' | 'price' | 'stock' 
>;

export class ProductEntity {
  public readonly id: string;
  public name: string;
  public description: string;
  public price: number;
  public stock: number;
  public imageUrl: string;
  public imageId: string;

  constructor(props: TProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.stock = props.stock;
    this.imageUrl = props.imageUrl;
    this.imageId = props.imageId;
  }

  static create(props: TProductProps): ProductEntity {
    return new ProductEntity(props);
  }

  update(props: Partial<Omit<TProductProps, 'id'>>): ProductEntity {
    return new ProductEntity({
      ...this.toPersistence(),
      ...props,
    });
  }

  toPersistence(): TProductProps {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      imageUrl: this.imageUrl,
      imageId: this.imageId,
    };
  }

  toResponse(): TProductResponse {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      price: this.price,
      stock: this.stock,
    };
  }
}
