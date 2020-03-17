import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RolePermissionDto } from './role-permission.dto';

export class RoleDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty({ type: 'array', items: { type: 'number' } })
  @Type(() => RolePermissionDto)
  @Transform(value => value?.map(rolePermission => rolePermission?.permissionId))
  permissions: number[];

}
