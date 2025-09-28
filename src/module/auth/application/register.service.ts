import { Inject, Injectable } from '@nestjs/common';
import {
  ID_GENERATOR_TOKEN,
  PASSWORD_HASHER_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/common/token';
import { IIDGenerator } from 'src/domain/shared/id-generator.interface';
import { UserEntity } from 'src/domain/user/user-entity';
import { IPasswordHasher } from 'src/domain/user/user-password-hasher.interface';
import { IUserRepository } from 'src/domain/user/user.repository.interface';

// types
type TRegisterServicePayload = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class RegisterService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(ID_GENERATOR_TOKEN)
    private readonly CryptoIdGenerator: IIDGenerator,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async register(payload: TRegisterServicePayload): Promise<UserEntity> {
    const passwordHash = await this.passwordHasher.hash(payload.password);
    
    const newUser = UserEntity.create({
      id: this.CryptoIdGenerator.generate(),
      ...payload,
      password: passwordHash,
    });

    return this.userRepository.create(newUser);
  }
}
