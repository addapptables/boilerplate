import { Command } from '@addapptables/microservice';
import { FindOneDto } from '../../../core/dto/find-one.dto';

export class DeleteUserCommand extends Command<FindOneDto> {
  public readonly action = 'deleteUser';
  public readonly context = 'user';
}
