import { Expose, Transform } from 'class-transformer';
import { Length, IsDefined, IsString, IsUUID } from 'class-validator';
import { MAX_CODE_LENGTH } from '../../../config';
import { ApiProperty } from '@nestjs/swagger';
import { CommandDto } from '../../../core/dto/command.dto';

export class CreateOrganizationUnitDto extends CommandDto {

  @Expose()
  @Transform(x => typeof x === 'string' ? x.trim() : x)
  @ApiProperty()
  @Length(2, MAX_CODE_LENGTH)
  @IsString()
  @IsDefined()
  name: string;

  @Expose()
  @ApiProperty({ required: false })
  @IsUUID('4')
  parentId?: string;

}
