import { Command } from '@addapptables/microservice';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UpdateUserCommand extends Command<UpdateUserDto> {
  public readonly action = 'updateUser';
  public readonly context = 'user';
}
