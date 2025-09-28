import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { IPasswordHasher } from 'src/domain/user/user-password-hasher.interface';

@Injectable()
export class PasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 9);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}
