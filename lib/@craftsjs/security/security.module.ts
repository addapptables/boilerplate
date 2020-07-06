import { Module } from '@nestjs/common';
import { SecurityService } from './services/security.service';

@Module({
  providers: [
    SecurityService,
  ],
  exports: [
    SecurityService,
  ],
})
export class SecurityModule { }
