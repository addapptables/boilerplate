import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PermissionDto {

  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  name!: string;

  @Expose()
  @ApiProperty()
  isHost!: boolean;

  @Expose()
  @ApiProperty({ required: false })
  parentId?: number;

}
