import { Expose } from 'class-transformer';
import { EditionType } from '../../../edition/infrastructure/database/enums/edition-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsEnum, IsNumber, IsString, ValidateIf } from 'class-validator';

export class EditionDto {

  @Expose()
  @ApiProperty()
  @IsString()
  @IsDefined()
  id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsDefined()
  name: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsDefined()
  isFree: boolean;

  @Expose()
  @ApiProperty({ required: false })
  @IsNumber()
  @ValidateIf(x => x.isFree === false)
  @IsDefined()
  price?: number;

  @Expose()
  @ApiProperty({ required: false })
  @ValidateIf(x => x.isFree === false)
  @IsNumber()
  numberOfUsers?: number;

  @Expose()
  @ApiProperty({ required: false })
  @ValidateIf(x => x.isFree === false)
  @IsNumber()
  trialDayCount?: number;

  @Expose()
  @ApiProperty({ required: false })
  @ValidateIf(x => x.isFree === false)
  @IsEnum(EditionType)
  editionType?: EditionType;

}
