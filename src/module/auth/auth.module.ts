import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterService } from './application/register.service';
import { USER_REPOSITORY_TOKEN } from 'src/common/token';
import { UserPrismaRepository } from 'src/infrastructure/user/user-prisma.repository';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [AuthController],
  providers: [
    RegisterService,

    { provide: USER_REPOSITORY_TOKEN, useClass: UserPrismaRepository },
  ],
})
export class AuthModule {}
