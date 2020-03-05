import { Query } from '@addapptables/microservice';
import { GetUserDto } from '../dtos/get-user.dto';

export class GetUserQuery extends Query<GetUserDto> {
  public readonly action = 'getUser';
  public readonly context = 'user';
}
