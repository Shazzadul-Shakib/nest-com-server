import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { RegisterService } from './application/register.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerService: RegisterService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const response = await this.registerService.register(registerDto);
    return ApiResponseDto.success('user data get successfully', response);
  }
}
