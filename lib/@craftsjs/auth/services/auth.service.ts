import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Broker } from '@addapptables/microservice';
import { mapper } from '../../utils';
import { SecurityService } from '../../security';
import { LoginResultDto } from '../application/dtos/login-result.dto';
import { SessionService } from './session.service';
import { User } from '../../user/infrastructure/database/entities/user.entity';
import { FindOneUserQuery } from '../../user/application/queries/find-one-user.query';
import { GetUserPermissionsQuery } from '../../user/application/queries/get-user-permissions.query';
import { UserDto } from '../../user/application/dtos/user.dto';
import { FindOneTenantQuery } from '../../tenant/application/queries/find-one-tenant.query';
import { Tenant } from '../../tenant/infrastructure/database/entities/tenant.entity';
import { TenantDto } from '../../tenant/application/dtos/tenant.dto';
import { LoginInformationDto } from '../application/dtos/login-information.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly broker: Broker,
    private readonly jwtService: JwtService,
    private readonly securityService: SecurityService,
    private readonly sessionService: SessionService,
  ) { }

  async getLoginInformation() {
    const loginInformation = new LoginInformationDto();
    if (this.sessionService.user) {
      const userData = await this.broker.start()
        .add(new FindOneUserQuery({ id: this.sessionService.user?.id, tenantId: this.sessionService.tenantId }))
        .end<User>();
      const permissionData = await this.broker.start()
        .add(new GetUserPermissionsQuery({ id: this.sessionService.user?.id, tenantId: this.sessionService.tenantId }))
        .end<string[]>();
      const user = mapper(UserDto, userData.data);
      user.permissions = permissionData.data;
      loginInformation.user = user;
    }
    if (this.sessionService.tenantId) {
      const tenantData = await this.broker.start()
        .add(new FindOneTenantQuery({ id: this.sessionService.tenantId }))
        .end<Tenant>();
      const tenant = mapper(TenantDto, tenantData.data);
      loginInformation.tenant = tenant;
    }
    return loginInformation;
  }

  async validateUser(userName: string, password: string): Promise<User> {
    const transferData = await this.broker.start()
      .add(new FindOneUserQuery({ userName, tenantId: this.sessionService.tenantId }))
      .end<User>();
    const user = transferData.data;
    const hash = this.securityService.convertStringToMd5(password);
    if (user && user.password === hash) {
      return user;
    } else {
      throw new UnauthorizedException('user.credentialsError');
    }
  }

  async validatePermissions(id: string, permissions: string[]) {
    const transferData = await this.broker.start()
      .add(new GetUserPermissionsQuery({ id, tenantId: this.sessionService.tenantId }))
      .end<string[]>();
    const userPermissions = transferData.data;
    return userPermissions.some(userPermission => permissions.some(permission => permission === userPermission));
  }

  async login(user: User): Promise<LoginResultDto> {
    const payload = { id: user.id, userName: user.userName, tenantId: this.sessionService.tenantId };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
    return {
      accessToken,
    };
  }

}
