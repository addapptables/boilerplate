import { Expose } from 'class-transformer';
import { MaxLength, IsUUID } from 'class-validator';
import { QueryDto } from '@craftsjs/core/dto/query.dto';
import { MAX_NAME_LENGTH } from '@craftsjs/config';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneUserDto extends QueryDto {

  @Expose()
  @ApiProperty({ required: false })
  @IsUUID('4')
  id?: string;

  @Expose()
  @ApiProperty({ required: false })
  @MaxLength(MAX_NAME_LENGTH)
  name?: string;

  @Expose()
  @ApiProperty({ required: false })
  emailAddress?: string;

  @Expose()
  @ApiProperty({ required: false })
  userName?: string;

}