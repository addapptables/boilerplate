import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginatedDto } from '../../../core/dto/paginated.dto';
import { IsUUID } from 'class-validator';

export class GetUserDto extends PaginatedDto {

  @ApiProperty({ required: false })
  @Expose()
  @IsUUID('4')
  id?: string;

  @ApiProperty({ required: false })
  @Expose()
  userName?: string;

  @ApiProperty({ required: false })
  @Expose()
  emailAddress?: string;

}
