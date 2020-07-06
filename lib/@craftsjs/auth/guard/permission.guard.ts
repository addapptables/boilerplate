import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!permissions) {
      return true;
    }
    const user = this.sessionService.user;
    if (!user) {
      return false;
    }
    return await this.authService.validatePermissions(user.id, permissions);
  }
}
