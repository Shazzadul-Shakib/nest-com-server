import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { RegisterService } from './application/register.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { registerApiResponse } from './auth-docs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly registerService: RegisterService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse(registerApiResponse.success)
  @ApiBadRequestResponse(registerApiResponse.validationError)
  @ApiConflictResponse(registerApiResponse.conflictError)
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const response = await this.registerService.register(registerDto);
    return ApiResponseDto.success('User registered successfully', response);
  }
}
