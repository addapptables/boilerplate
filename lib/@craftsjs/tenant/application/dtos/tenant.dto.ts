import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TenantDto {

  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  subDomain: string;

  @Expose()
  @ApiProperty()
  isActive: boolean;

  @Expose()
  @ApiProperty({ required: false })
  editionId?: number;

}
