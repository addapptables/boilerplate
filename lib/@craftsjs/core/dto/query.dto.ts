import { Expose } from 'class-transformer';

export class QueryDto {

  @Expose()
  tenantId?: number;

  @Expose()
  currentUserId?: number;

}
