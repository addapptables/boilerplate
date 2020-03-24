import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { QueryDto } from '../../../core/dto/query.dto';
import { IsUUID } from 'class-validator';

export class GetUserPermissionsDto extends QueryDto {
  @ApiProperty()
  @Expose()
  @IsUUID('4')
  id: string;
}
