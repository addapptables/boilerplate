import { Expose, Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleDto } from './user-role.dto';
import { IsArray, IsBoolean, IsDefined, IsString } from 'class-validator';

export class UserDto {

  @Expose()
  @ApiProperty()
  @IsString()
  @IsDefined()
  id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsDefined()
  userName: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsDefined()
  emailAddress: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsDefined()
  name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsDefined()
  surname: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsDefined()
  isStatic: boolean;

  @Expose()
  @ApiProperty({ required: false })
  @IsString()
  phoneNumber?: string;

  @Expose()
  @ApiProperty({ required: false })
  @IsBoolean()
  isActive?: boolean;

  @Expose()
  @ApiProperty({ required: false })
  @IsString()
  lastOrganizationUnitId?: string;

  @Expose()
  @ApiProperty({ type: 'array', items: { type: 'number' } })
  @Type(() => UserRoleDto)
  @Transform(value => value?.map(userRole => userRole.roleId))
  @IsArray()
  roles: string[];

  @Expose()
  @ApiProperty({ type: 'array', items: { type: 'string' } })
  permissions: string[];

}
