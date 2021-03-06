import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginatedDto } from '../../../core/dto/paginated.dto';

export class GetEditionDto extends PaginatedDto {

  @ApiProperty({ required: false })
  @Expose()
  name?: string;

}
