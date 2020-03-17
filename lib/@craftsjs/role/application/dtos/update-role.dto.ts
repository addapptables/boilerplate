import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends CreateRoleDto {

  @IsDefined()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

}
