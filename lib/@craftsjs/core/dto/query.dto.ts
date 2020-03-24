import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class QueryDto {

  @Expose()
  @IsUUID('4')
  tenantId?: string;

  @Expose()
  @IsUUID('4')
  currentUserId?: string;

}
