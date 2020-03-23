import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { QueryDto } from '../../../core/dto/query.dto';

export class GetUserPermissionsDto extends QueryDto {
  @ApiProperty()
  @Expose()
  id: number;
}
