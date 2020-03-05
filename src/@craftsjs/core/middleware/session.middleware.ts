import { Injectable, NestMiddleware } from '@nestjs/common';
import { TenantService, TenantCacheContributor, TenantHeaderContributor, TenantCookieContributor, TenantSubdomainContributor } from '../../tenants';
import { SessionService } from '../../auth/services/session.service';
import { Request } from 'express';

@Injectable()
export class SessionMiddleware implements NestMiddleware {

  constructor(
    private readonly sessionService: SessionService,
    private readonly tenantService: TenantService,
  ) { }

  async use(req: Request, _: Response, next: any) {
    this.sessionService.user = (req as any).session.user;
    this.sessionService.tenantId = await this.resolveTenant(req);
    req.session.tenantId = this.sessionService.tenantId;
    req.body.tenantId = this.sessionService.tenantId;
    req.body.currentUserId = this.sessionService.user?.id;
    req.query.tenantId = this.sessionService.tenantId;
    req.query.currentUserId = this.sessionService.user?.id;
    req.params.tenantId = this.sessionService.tenantId as any;
    req.params.currentUserId = this.sessionService.user?.id as any;
    next();
  }

  private async resolveTenant(req: Request) {
    const tenantCache = new TenantCacheContributor();
    const tenantHeader = new TenantHeaderContributor();
    const tenantCookie = new TenantCookieContributor();
    const tenantSubdomain = new TenantSubdomainContributor(this.tenantService);
    tenantCache.registerNext(tenantHeader);
    tenantHeader.registerNext(tenantCookie);
    tenantCookie.registerNext(tenantSubdomain);
    return await tenantCache.resolveTenant(req);
  }
}
