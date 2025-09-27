import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from 'src/common/token';
import { UserEntity } from 'src/domain/user/user-entity';
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
  ) {}

  async register(payload: TRegisterServicePayload): Promise<UserEntity> {
    const newUser = UserEntity.create({
      id: '124',
      ...payload,
    });

    return this.userRepository.create(newUser);
  }
}
