import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterService } from './application/register.service';

@Module({
  controllers: [AuthController],
  providers: [RegisterService],
})
export class AuthModule {}
