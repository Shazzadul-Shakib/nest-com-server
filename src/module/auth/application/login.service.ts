import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  PASSWORD_HASHER_TOKEN,
  TOKEN_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/common/token';
import { IPasswordHasher } from 'src/domain/user/user-password-hasher.interface';
import { ITokenService } from 'src/domain/user/user-token.interface';
import { IUserRepository } from 'src/domain/user/user.repository.interface';

type TLoginServicePayload = {
  email: string;
  password: string;
};

@Injectable()
export class LoginService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,

    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,
  ) {}

  async login(payload: TLoginServicePayload) {
    const user = await this.userRepository.findByEmail(payload.email);

    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await user.comparPassword(
      payload.password,
      this.passwordHasher,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid Credentials.');

    const accessToken = this.tokenService.generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: user.id,
    });

    return { accessToken, refreshToken };
  }
}
