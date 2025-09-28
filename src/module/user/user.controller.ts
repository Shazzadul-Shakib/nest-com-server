import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './application/user.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard,RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('Admin')
  @Get('/')
  async getUsers() {
    const response = await this.userService.getAllUsers();
    return ApiResponseDto.success('Users retrived successfully', response);
  }
}
