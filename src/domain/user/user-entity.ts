export type TUserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export class UserEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  private password: string;

  constructor({ id, name, email, password }: TUserProps) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static create(props: TUserProps): UserEntity {
    return new UserEntity(props);
  }

  toPersistence(): TUserProps {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
    };
  }
}
