import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class EntityDto {

  @ApiProperty()
  @Expose()
  @IsUUID('4')
  id: string;

}
