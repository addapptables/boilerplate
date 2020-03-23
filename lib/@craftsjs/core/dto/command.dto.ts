import { Expose } from 'class-transformer';

export class CommandDto {

  @Expose()
  id: number;

  @Expose()
  tenantId?: number;

  @Expose()
  currentUserId?: number;

}
