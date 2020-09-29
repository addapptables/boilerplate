import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDefined, IsNumber, IsString } from 'class-validator';

export class TenantDto {

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
  @IsString()
  @IsDefined()
  subDomain: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsDefined()
  isActive: boolean;

  @Expose()
  @ApiProperty({ required: false })
  @IsNumber()
  editionId?: number;

  @Expose()
  @ApiProperty({ required: false })
  @IsBoolean()
  isSubscriptionEnded?: boolean;

  @Expose()
  @ApiProperty({ required: false })
  @IsNumber()
  remainingDayCount?: number;

  @Expose()
  @ApiProperty({ required: false })
  @IsDate()
  subscriptionEndDate?: Date;

}
