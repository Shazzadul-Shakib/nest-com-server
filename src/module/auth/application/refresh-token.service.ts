import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TOKEN_SERVICE_TOKEN, USER_REPOSITORY_TOKEN } from 'src/common/token';
import { ITokenService } from 'src/domain/user/user-token.interface';
import { IUserRepository } from 'src/domain/user/user.repository.interface';

@Injectable()
export class RefreshTokenService {
  constructor(
    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async getAccessToken(token: string) {
    const isTokenValid = this.tokenService.verifyRefreshToken(token);

    if (!isTokenValid?.id) throw new UnauthorizedException('Invalid token');

    const user = await this.userRepository.findById(isTokenValid.id);
    if (!user) throw new NotFoundException('User not found');

    const accessToken = this.tokenService.generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return accessToken;
  }
}
