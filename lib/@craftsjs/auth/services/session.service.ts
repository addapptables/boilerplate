import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {

  user: { id: number, userName: string, tenantId?: number };

  tenantId?: number;

}
