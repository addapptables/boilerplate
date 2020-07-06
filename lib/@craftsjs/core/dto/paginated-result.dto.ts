import { Expose } from 'class-transformer';

export class PaginatedResultDto<T> {

  @Expose()
  data: T;

  @Expose()
  total: number;
}
