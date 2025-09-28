import { UserEntity } from "./user-entity";

export abstract class IUserRepository{
    abstract create(user:UserEntity):Promise<UserEntity>;
    abstract findByEmail(email:string):Promise<UserEntity | null>;
}