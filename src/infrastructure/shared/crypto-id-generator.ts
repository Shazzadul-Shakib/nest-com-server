import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IIDGenerator } from 'src/domain/shared/id-generator.interface';

@Injectable()
export class CryptoIdGenerator implements IIDGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
