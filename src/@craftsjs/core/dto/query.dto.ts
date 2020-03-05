import { IQueryDto } from '@addapptables/microservice';
import { Expose } from 'class-transformer';

export class QueryDto implements IQueryDto {

  @Expose()
  tenantId?: number;

  @Expose()
  currentUserId?: number;

}
