import { Query } from '@addapptables/microservice';
import { GetEditionDto } from '../dtos/get-edition.dto';

export class findAllEditionQuery extends Query<GetEditionDto> {
  public readonly action = 'getEdition';
  public readonly context = 'edition';
}
