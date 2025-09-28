import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './application/user.service';
import { USER_REPOSITORY_TOKEN } from 'src/common/token';
import { UserPrismaRepository } from 'src/infrastructure/user/user-prisma.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: USER_REPOSITORY_TOKEN, useClass: UserPrismaRepository },
  ],
})
export class UserModule {}
