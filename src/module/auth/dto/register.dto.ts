import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'Name of User', example: 'Shakib' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be string' })
  @Matches(/\S/, { message: 'Name cannot be empty or whitespace' })
  name: string;

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
