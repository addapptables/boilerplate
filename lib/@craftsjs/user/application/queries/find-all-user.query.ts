import { Query } from '@addapptables/microservice';
import { GetUserDto } from '../dtos/get-user.dto';

export class FindAllUserQuery extends Query<GetUserDto> {
  public readonly action = 'getUsers';
  public readonly context = 'user';
}
