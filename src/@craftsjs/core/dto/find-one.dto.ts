import { IsNumber, IsDefined } from 'class-validator';
import { Transform, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { QueryDto } from './query.dto';

export class FindOneDto extends QueryDto {

  @Expose()
  @Transform(value => parseInt(value, 10), { toClassOnly: true })
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  id: number;

}
