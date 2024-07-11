import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
