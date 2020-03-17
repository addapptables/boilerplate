import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateTenantDto } from './create-tenant.dto';

export class UpdateTenantDto extends CreateTenantDto {

  @IsDefined()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

}
