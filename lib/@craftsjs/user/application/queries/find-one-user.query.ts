import { Query } from '@addapptables/microservice';
import { FindOneUserDto } from '../dtos/find-one-user.dto';

export class FindOneUserQuery extends Query<FindOneUserDto> {
  public readonly action = 'getUser';
  public readonly context = 'user';
}
