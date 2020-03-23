import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { EditionDomainService } from '../services/edition.service';
import { Edition } from '../../infrastructure/database/entities/edition.entity';
import { UpdateEditionCommand } from '../../application/commands/update-edition.command';
import { mapper } from '../../../utils';

@CommandHandler(UpdateEditionCommand)
export class UpdateEditionHandler implements ICommandHandler<UpdateEditionCommand> {

  constructor(
    private readonly editionService: EditionDomainService,
  ) { }

  handle(event: UpdateEditionCommand): any {
    const edition = mapper(Edition, event.data);
    return this.editionService.update(edition);
  }

}
