import { Injectable, NestMiddleware } from '@nestjs/common';
import { TenantHeaderContributor, TenantCookieContributor, TenantSubdomainContributor } from '../../tenant';
import { SessionService } from '../services/session.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TenantDomainService } from '../../tenant/domain/services/tenant.service';
import { CraftsLogger } from '@addapptables/microservice';

@Injectable()
export class SessionMiddleware implements NestMiddleware {

  constructor(
    private readonly sessionService: SessionService,
    private readonly tenantService: TenantDomainService,
    private readonly jwtService: JwtService,
    private readonly logger: CraftsLogger
  ) { }

  async use(req: Request, _: Response, next: any) {
    try {
      this.sessionService.impersonatorUserId = null;
      this.sessionService.tenantId = null;
      this.sessionService.user = null;
      await this.resolveUser(req);
      this.sessionService.tenantId = await this.resolveTenant(req);
      req.body.tenantId = req.body.tenantId || this.sessionService.tenantId;
      req.body.currentUserId = this.sessionService.user?.id;
      req.query.tenantId = req.query.tenantId || this.sessionService.tenantId;
      req.query.currentUserId = this.sessionService.user?.id;
    } catch (error) {
      this.logger.error(error);
    }
    next();
  }

  private async resolveUser(req: Request) {
    const bearer = req.get('authorization');
    if (bearer) {
      try {
        await this.jwtService.verifyAsync(bearer.replace('Bearer ', ''), {})
        const user = this.jwtService.decode(bearer.replace('Bearer ', '')) as any;
        this.sessionService.user = user as any;
        this.sessionService.impersonatorUserId = user?.bearer;
      } catch (error) {
        this.logger.error(error);
      }
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
