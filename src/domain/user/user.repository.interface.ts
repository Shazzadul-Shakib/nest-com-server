import { UserEntity } from "./user-entity";

export abstract class IUserRepository{
    abstract create(user:UserEntity):Promise<UserEntity>;
}