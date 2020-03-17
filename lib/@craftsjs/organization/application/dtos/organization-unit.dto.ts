import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrganizationUnitDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty({ required: false })
  parentId?: number;

}
