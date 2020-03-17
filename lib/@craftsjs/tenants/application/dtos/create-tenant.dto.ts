import { Expose } from 'class-transformer';
import { Length, IsDefined, IsBoolean, IsNumber } from 'class-validator';
import { MAX_NAME_LENGTH } from '@craftsjs/config/constants.config';
import { ApiProperty } from '@nestjs/swagger';
import { CommandDto } from '../../../core/dto/command.dto';

export class CreateTenantDto extends CommandDto {

  @Expose()
  @ApiProperty()
  @Length(2, MAX_NAME_LENGTH)
  @IsDefined()
  name: string;

  @Expose()
  @ApiProperty()
  @Length(2, MAX_NAME_LENGTH)
  @IsDefined()
  subDomain: string;

  @Expose()
  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  isActive: boolean;

  @Expose()
  @ApiProperty({ required: false })
  @IsNumber()
  editionId?: number;

}
