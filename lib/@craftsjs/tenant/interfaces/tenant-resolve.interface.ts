import { Request } from 'express';

export interface ITenantResolve {
  resolveTenant(request: Request): Promise<number> | number;

  registerNext?(next: ITenantResolve);
}
