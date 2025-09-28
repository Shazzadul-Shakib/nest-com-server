import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { PrismaModule } from './core/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
})
export class AppModule {}
