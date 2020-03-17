import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Length, IsDefined, IsBoolean, IsNumber, IsEnum, ValidateIf } from 'class-validator';
import { CommandDto } from '@craftsjs/core/dto/command.dto';
import { MAX_NAME_LENGTH } from '@craftsjs/config/constants.config';
import { EditionType } from '@craftsjs/editions';

export class CreateEditionDto extends CommandDto {

  @Expose()
  @ApiProperty()
  @IsDefined()
  @Length(2, MAX_NAME_LENGTH)
  name: string;

  @Expose()
  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  isFree: boolean;

  @Expose()
  @ApiProperty({ required: false })
  @ValidateIf(x => x.isFree === false)
  @IsDefined()
  @IsNumber()
  price?: number;

  @Expose()
  @ApiProperty({ required: false })
  @ValidateIf(x => x.isFree === false)
  @IsDefined()
  @IsNumber()
  numberOfUsers?: number;

  @Expose()
  @ApiProperty({ required: false })
  @ValidateIf(x => x.isFree === false)
  @IsDefined()
  @IsNumber()
  trialDayCount?: number;

  @Expose()
  @ApiProperty({ required: false })
  @ValidateIf(x => x.isFree === false)
  @IsDefined()
  @IsEnum(EditionType)
  editionType?: EditionType;
}
