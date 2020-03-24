import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateTenantDto } from './create-tenant.dto';

export class UpdateTenantDto extends CreateTenantDto {

  @IsDefined()
  @Expose()
  @ApiProperty()
  @IsUUID('4')
  id: string;

}
