import { Command } from '@addapptables/microservice';
import { UpdateEditionDto } from '../dtos/update-edition.dto';

export class UpdateEditionCommand extends Command<UpdateEditionDto> {
  public readonly action = 'updateEdition';
  public readonly context = 'edition';
}
