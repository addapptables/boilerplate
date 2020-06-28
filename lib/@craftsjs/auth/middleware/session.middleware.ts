import { Injectable, NestMiddleware } from '@nestjs/common';
import { TenantHeaderContributor, TenantCookieContributor, TenantSubdomainContributor } from '../../tenant';
import { SessionService } from '../services/session.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TenantDomainService } from '../../tenant/domain/services/tenant.service';

@Injectable()
export class SessionMiddleware implements NestMiddleware {

  constructor(
    private readonly sessionService: SessionService,
    private readonly tenantService: TenantDomainService,
    private readonly jwtService: JwtService,
  ) { }

  async use(req: Request, _: Response, next: any) {
    this.resolveUser(req);
    this.sessionService.tenantId = await this.resolveTenant(req);
    req.body.tenantId = req.body.tenantId || this.sessionService.tenantId;
    req.body.currentUserId = this.sessionService.user?.id;
    req.query.tenantId = req.query.tenantId || this.sessionService.tenantId;
    req.query.currentUserId = this.sessionService.user?.id;
    next();
  }

  private async resolveUser(req: Request) {
    const bearer = req.get('authorization');
    if (bearer) {
      const user = this.jwtService.decode(bearer.replace('Bearer ', '')) as any;
      this.sessionService.user = user as any;
      this.sessionService.impersonatorUserId = user?.bearer;
    } else {
      this.sessionService.user = undefined;
    }
    if (!this.sessionService.tenantId) {
      this.sessionService.tenantId = this.sessionService.user?.tenantId;
    }
  }

  private async resolveTenant(req: Request) {
    const tenantHeader = new TenantHeaderContributor();
    const tenantCookie = new TenantCookieContributor();
    const tenantSubdomain = new TenantSubdomainContributor(this.tenantService);
    tenantHeader.registerNext(tenantCookie);
    tenantCookie.registerNext(tenantSubdomain);
    return await tenantHeader.resolveTenant(req);
  }
}
