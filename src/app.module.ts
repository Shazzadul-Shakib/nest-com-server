import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
})
export class AppModule {}
