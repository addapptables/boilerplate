import { Expose } from 'class-transformer';

export class UserRoleDto {

  @Expose()
  roleId: string;

}
