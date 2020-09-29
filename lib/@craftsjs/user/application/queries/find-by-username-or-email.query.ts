import { Query } from '@addapptables/microservice';
import { FindOneUserDto } from '../dtos/find-one-user.dto';

export class FindByUserNameOrEmailQuery extends Query<FindOneUserDto> {
  public readonly action = 'getUsersByUsernameOrEmail';
  public readonly context = 'user';
}
