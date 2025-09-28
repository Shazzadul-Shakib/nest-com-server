import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
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
import { LoginDto } from './dto/login.dto';
import { LoginService } from './application/login.service';
import type { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
  ) {}

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

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.loginService.login(loginDto);

    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.json(
      ApiResponseDto.success('User logged in successfully', { accessToken }),
    );
  }
}
