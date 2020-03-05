import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Broker } from '@addapptables/microservice';
import { SecurityService } from '../../security';
import { LoginResultDto } from '../application/dtos/login-result.dto';
import { SessionService } from './session.service';
import { GetUserDto } from '../../user/application/dtos/get-user.dto';
import { User } from '../../user/infrastructure/database/entities/user.entity';
import { GetUserQuery } from '../../user/application/queries/get-user.query';
import { GetUserPermissionsQuery } from '../../user/application/queries/get-user.permissions.query';

@Injectable()
export class AuthService {

  constructor(
    private readonly broker: Broker,
    private readonly jwtService: JwtService,
    private readonly securityService: SecurityService,
    private readonly sessionService: SessionService,
  ) { }

  async validateUser(userName: string, password: string): Promise<User> {
    const transferData = await this.broker.start()
      .add(new GetUserQuery({ userName, tenantId: this.sessionService.tenantId } as GetUserDto))
      .end<User>();
    const user = transferData.data;
    const hash = this.securityService.convertStringToMd5(password);
    if (user && user.password === hash) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  async ValidatePermissions(id: number, permissions: string[]) {
    const transferData = await this.broker.start()
      .add(new GetUserPermissionsQuery({ id }))
      .end<string[]>();
    const userPermissions = transferData.data;
    return userPermissions.some(userPermission => permissions.some(permission => permission === userPermission));
  }

  async login(user: User): Promise<LoginResultDto> {
    const payload = { id: user.id, userName: user.userName, tenantId: this.sessionService.tenantId };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }

}
