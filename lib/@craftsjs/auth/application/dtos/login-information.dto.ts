import { UserDto } from '../../../user/application/dtos/user.dto';
import { TenantDto } from '../../../tenant/application/dtos/tenant.dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginInformationDto {

  @Expose()
  @ApiProperty({ required: false })
  user?: UserDto;

  @Expose()
  @ApiProperty({ required: false })
  tenant?: TenantDto;

  impersonatorUserId?: string;

}