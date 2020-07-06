import { Expose } from 'class-transformer';
import { EditionType } from '../../../edition/infrastructure/database/enums/edition-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class EditionDto {

  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  isFree: boolean;

  @Expose()
  @ApiProperty({ required: false })
  price?: number;

  @Expose()
  @ApiProperty({ required: false })
  numberOfUsers?: number;

  @Expose()
  @ApiProperty({ required: false })
  trialDayCount?: number;

  @Expose()
  @ApiProperty({ required: false })
  editionType?: EditionType;

}
