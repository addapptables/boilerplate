import { Command } from '@addapptables/microservice';
import { CommandDto } from '../../../core/dto/command.dto';

export class DeleteUserCommand extends Command<CommandDto> {
  public readonly action = 'deleteUser';
  public readonly context = 'user';
}
