import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';
import { CreateOrganizationUnitDto } from './create-organization-unit.dto';

export class UpdateOrganizationUnitDto extends CreateOrganizationUnitDto {

  @IsDefined()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

}
