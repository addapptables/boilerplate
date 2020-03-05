import { Command } from '@addapptables/microservice';
import { CreateUserDto } from '../dtos/create-user.dto';

export class CreateUserCommand extends Command<CreateUserDto> {
  public readonly action = 'createUser';
  public readonly context = 'user';
}
