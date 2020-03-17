import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginatedDto } from '@craftsjs/core/dto/paginated.dto';

export class GetTenantDto extends PaginatedDto {

  @ApiProperty({ required: false })
  @Expose()
  name?: string;

}
