import { Expose, Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleDto } from './user-role.dto';

export class UserDto {

  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  userName: string;

  @Expose()
  @ApiProperty()
  emailAddress: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  surname: string;

  @Expose()
  @ApiProperty({ required: false })
  phoneNumber?: string;

  @Expose()
  @ApiProperty({ required: false })
  isActive?: boolean;

  @Expose()
  @ApiProperty({ type: 'array', items: { type: 'number' } })
  @Type(() => UserRoleDto)
  @Transform(value => value.map(userRole => userRole.roleId))
  roles: number[];

  @ApiProperty({ type: 'array', items: { type: 'string' } })
  permissions: string[];

}
