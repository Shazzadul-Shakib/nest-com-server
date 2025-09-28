import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email of User', example: 'xyz@ab.com' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid Email address' })
  email: string;

  @ApiProperty({ description: 'Password  of User', example: 'xxxxxx' })
  @IsNotEmpty({ message: 'Password is requred' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
