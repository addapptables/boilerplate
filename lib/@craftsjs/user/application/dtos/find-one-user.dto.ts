import { Expose, Transform } from 'class-transformer';
import { MaxLength, IsEmail, IsNumber } from 'class-validator';
import { QueryDto } from '@craftsjs/core/dto/query.dto';
import { MAX_NAME_LENGTH } from '@craftsjs/config';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneUserDto extends QueryDto {

  @Expose()
  @ApiProperty()
  @Transform(value => parseInt(value, 10), { toClassOnly: true })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  id?: number;

  @Expose()
  @ApiProperty()
  @MaxLength(MAX_NAME_LENGTH)
  name?: string;

  @Expose()
  @ApiProperty()
  @IsEmail()
  emailAddress?: string;

  @Expose()
  @ApiProperty()
  userName?: string;

}