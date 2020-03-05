import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class EntityDto {

  @ApiProperty()
  @Expose()
  id: number;

}
