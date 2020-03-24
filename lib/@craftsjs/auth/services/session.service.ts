import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {

  user: { id: string, userName: string, tenantId?: number };

  tenantId?: string;

}
