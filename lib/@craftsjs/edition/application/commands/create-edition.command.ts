import { Command } from '@addapptables/microservice';
import { CreateEditionDto } from '../dtos/create-edition.dto';

export class CreateEditionCommand extends Command<CreateEditionDto> {
  public readonly action = 'createEdition';
  public readonly context = 'edition';
}
