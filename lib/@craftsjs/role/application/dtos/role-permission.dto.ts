import { Expose } from 'class-transformer';

export class RolePermissionDto {

  @Expose()
  permissionId!: string;

}
