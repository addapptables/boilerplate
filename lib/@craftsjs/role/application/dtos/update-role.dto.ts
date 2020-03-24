import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends CreateRoleDto {

  @IsDefined()
  @IsUUID('4')
  @Expose()
  @ApiProperty()
  id: string;

}
