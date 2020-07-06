import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsUUID } from 'class-validator';
import { CreateOrganizationUnitDto } from './create-organization-unit.dto';

export class UpdateOrganizationUnitDto extends CreateOrganizationUnitDto {

  @IsDefined()
  @IsUUID('4')
  @Expose()
  @ApiProperty()
  id: string;

}
