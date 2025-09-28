import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from 'src/common/token';
import { IUserRepository } from 'src/domain/user/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async getAllUsers() {
    const allUsers = await this.userRepository.findAll();
    return allUsers;
  }
}
