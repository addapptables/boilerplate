import { Query } from '@addapptables/microservice';
import { FindOneDto } from '@craftsjs/core/dto/find-one.dto';

export class FindOneEditionQuery extends Query<FindOneDto> {
  public readonly action = 'findOneEdition';
  public readonly context = 'edition';
}
