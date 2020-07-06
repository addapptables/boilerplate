import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class TenantAvailableDto {

  @Expose()
  id?: string;

  @ApiProperty()
  @Expose()
  @IsDefined()
  name: string;

  @Expose()
  isActive?: boolean;

}