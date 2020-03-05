import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDefined } from 'class-validator';
import { QueryDto } from './query.dto';

export class PaginatedDto extends QueryDto {

  @Expose()
  @Transform(value => parseInt(value, 10), { toClassOnly: true })
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  skip: number;

  @Expose()
  @Transform(value => parseInt(value, 10), { toClassOnly: true })
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  take: number;

}
