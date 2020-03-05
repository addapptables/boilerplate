import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginatedDto } from '../../../core/dto/paginated.dto';

export class GetUserDto extends PaginatedDto {

  @ApiProperty({ required: false })
  @Expose()
  id?: string;

  @ApiProperty({ required: false })
  @Expose()
  userName?: string;

  @ApiProperty({ required: false })
  @Expose()
  emailAddress?: string;

}
