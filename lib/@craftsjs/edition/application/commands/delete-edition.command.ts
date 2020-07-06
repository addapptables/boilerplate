import { Command } from '@addapptables/microservice';
import { CommandDto } from '../../../core/dto/command.dto';

export class DeleteEditionCommand extends Command<CommandDto> {
  public readonly action = 'deleteEdition';
  public readonly context = 'edition';
}
