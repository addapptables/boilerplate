import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindOneTenantDto {

  @Expose()
  @IsUUID('4')
  @ApiProperty({ required: false })
  id?: string;

  @Expose()
  @ApiProperty({ required: false })
  name?: string;

  @Expose()
  @ApiProperty({ required: false })
  isActive?: boolean;

}