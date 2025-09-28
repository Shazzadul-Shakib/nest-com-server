import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
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
import type { Request, Response } from 'express';
import { RefreshTokenService } from './application/refresh-token.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
    private readonly refreshTokenService: RefreshTokenService,
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

  @Get('/access-token')
  async getAccessToken(@Req() req: Request) {
    const refreshToken = (await req.cookies['refresh-token']) as string;
    console.log({refreshToken})

    if (!refreshToken)
      throw new UnauthorizedException('No token has been provided');

    const accessToken =
      await this.refreshTokenService.getAccessToken(refreshToken);

    return ApiResponseDto.success('Access token retrived successfully', {
      accessToken,
    });
  }
}
