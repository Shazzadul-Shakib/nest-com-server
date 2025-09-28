import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterService } from './application/register.service';
import {
  ID_GENERATOR_TOKEN,
  PASSWORD_HASHER_TOKEN,
  TOKEN_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/common/token';
import { UserPrismaRepository } from 'src/infrastructure/user/user-prisma.repository';
import { CryptoIdGenerator } from 'src/infrastructure/shared/crypto-id-generator';
import { PasswordHasher } from 'src/infrastructure/user/bcrypt-password-hasher';
import { LoginService } from './application/login.service';
import { JwtTokenService } from 'src/infrastructure/user/jwt-token-service';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './application/refresh-token.service';

@Module({
  imports: [JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [
    RegisterService,
    LoginService,
    RefreshTokenService,

    { provide: USER_REPOSITORY_TOKEN, useClass: UserPrismaRepository },
    { provide: ID_GENERATOR_TOKEN, useClass: CryptoIdGenerator },
    { provide: PASSWORD_HASHER_TOKEN, useClass: PasswordHasher },
    { provide: TOKEN_SERVICE_TOKEN, useClass: JwtTokenService },
  ],
})
export class AuthModule {}
