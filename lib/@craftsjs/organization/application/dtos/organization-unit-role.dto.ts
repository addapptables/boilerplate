import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OrganizationUnitRoleDto {

  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  roleId: string;

  @Expose()
  @ApiProperty()
  organizationUnitId: string;

}
