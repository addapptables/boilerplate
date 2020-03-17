import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class SecurityService {

  convertStringToMd5(input: string) {
    const hash = crypto.createHash('md5').update(input).digest('hex');
    return hash;
  }

}
