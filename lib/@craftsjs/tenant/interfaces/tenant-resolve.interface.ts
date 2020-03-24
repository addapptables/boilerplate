import { Request } from 'express';

export interface ITenantResolve {
  resolveTenant(request: Request): Promise<string> | string;

  registerNext?(next: ITenantResolve);
}
