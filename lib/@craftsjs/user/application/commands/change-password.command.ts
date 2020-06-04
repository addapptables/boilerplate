import { Command } from '@addapptables/microservice';
import { ChangePasswordDto } from '../dtos/change-password.dto';

export class ChangePasswordCommand extends Command<ChangePasswordDto> {
  public readonly action = 'changePassword';
  public readonly context = 'user';
}
