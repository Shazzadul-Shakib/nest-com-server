import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  //   constructor(private readonly registerService) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return {
      registerDto,
    };
  }
}
