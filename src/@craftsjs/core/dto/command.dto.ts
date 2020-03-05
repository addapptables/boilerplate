import { ICommandDto } from '@addapptables/microservice';
import { Expose } from 'class-transformer';

export class CommandDto implements ICommandDto {

  @Expose()
  id: number;

  @Expose()
  tenantId?: number;

  @Expose()
  currentUserId?: number;

}
