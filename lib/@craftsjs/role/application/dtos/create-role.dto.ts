import { IsDefined, Length, IsArray } from 'class-validator';
import { MAX_NAME_LENGTH } from '@craftsjs/config';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CommandDto } from '@craftsjs/core/dto/command.dto';

export class CreateRoleDto extends CommandDto {

  @IsDefined()
  @Length(2, MAX_NAME_LENGTH)
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ type: 'array', items: { type: 'number' } })
  @Expose()
  @IsDefined()
  @IsArray()
  permissions: number[];

}
