import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OrganizationUnitRoleDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  roleId: number;

  @Expose()
  @ApiProperty()
  organizationUnitId: number;

}
