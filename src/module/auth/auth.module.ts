import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterService } from './application/register.service';
import { ID_GENERATOR_TOKEN, PASSWORD_HASHER_TOKEN, USER_REPOSITORY_TOKEN } from 'src/common/token';
import { UserPrismaRepository } from 'src/infrastructure/user/user-prisma.repository';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CryptoIdGenerator } from 'src/infrastructure/shared/crypto-id-generator';
import { PasswordHasher } from 'src/infrastructure/user/bcrypt-password-hasher';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [
    RegisterService,

    { provide: USER_REPOSITORY_TOKEN, useClass: UserPrismaRepository },
    { provide: ID_GENERATOR_TOKEN, useClass: CryptoIdGenerator },
    { provide: PASSWORD_HASHER_TOKEN, useClass: PasswordHasher },
  ],
})
export class AuthModule {}
