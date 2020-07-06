import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticatedGuard extends AuthGuard('jwt') implements CanActivate {

  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    super.handleRequest(undefined, request.user, undefined, undefined);
    return result;
  }
}
