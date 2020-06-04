import { Command } from '@addapptables/microservice';
import { UpdateProfileDto } from '../dtos/update-profile.dto';

export class UpdateProfileCommand extends Command<UpdateProfileDto> {
  public readonly action = 'updateProfile';
  public readonly context = 'user';
}
