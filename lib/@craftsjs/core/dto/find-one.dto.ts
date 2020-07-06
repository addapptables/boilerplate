import { IsDefined, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { QueryDto } from './query.dto';

export class FindOneDto extends QueryDto {

  @Expose()
  @ApiProperty()
  @IsDefined()
  @IsUUID('4')
  id: string;

}
