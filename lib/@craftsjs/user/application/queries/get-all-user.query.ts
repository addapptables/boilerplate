import { Query } from '@addapptables/microservice';
import { GetUserDto } from '../dtos/get-user.dto';

export class findAllUserQuery extends Query<GetUserDto> {
  public readonly action = 'getUsers';
  public readonly context = 'user';
}
