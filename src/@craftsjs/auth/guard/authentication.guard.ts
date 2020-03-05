import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionService } from '../services/session.service';

@Injectable()
export class AuthenticatedGuard extends AuthGuard('jwt') implements CanActivate {

  constructor(private readonly sessionService: SessionService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    super.handleRequest(undefined, request.user, undefined, undefined);
    request.session.user = request.user;
    this.sessionService.user = request.user;
    this.sessionService.tenantId = this.sessionService.tenantId ? this.sessionService.tenantId : request.user?.tenantId;
    request.body.tenantId = this.sessionService.tenantId;
    request.body.currentUserId = this.sessionService.user?.id;
    request.query.tenantId = this.sessionService.tenantId;
    request.query.currentUserId = this.sessionService.user?.id;
    request.params.tenantId = this.sessionService.tenantId;
    request.params.currentUserId = this.sessionService.user?.id;
    return result;
  }
}
