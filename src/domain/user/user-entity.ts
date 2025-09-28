import { IPasswordHasher } from './user-password-hasher.interface';

export type TRole = 'Customer' | 'Admin';

export type TUserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: TRole;
};

export class UserEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly role: TRole;
  private password: string;

  constructor({ id, name, email, password, role }: TUserProps) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role ?? 'Customer';
  }

  static create(props: TUserProps): UserEntity {
    return new UserEntity(props);
  }

  async comparPassword(
    plainPassword: string,
    hasher: IPasswordHasher,
  ): Promise<boolean> {
    return hasher.compare(plainPassword, this.password);
  }

  toPersistence(): TUserProps {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
      role: this.role ?? 'Customer',
    };
  }
}
