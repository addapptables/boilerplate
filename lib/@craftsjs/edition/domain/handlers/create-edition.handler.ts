import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { EditionDomainService } from '../services/edition.service';
import { mapper } from '../../../utils';
import { CreateEditionCommand } from '../../application/commands/create-edition.command';
import { Edition } from '../../infrastructure/database/entities/edition.entity';

@CommandHandler(CreateEditionCommand)
export class CreateEditionHandler implements ICommandHandler<CreateEditionCommand> {

  constructor(
    private readonly editionService: EditionDomainService,
  ) { }

  handle(event: CreateEditionCommand): any {
    const edition = mapper(Edition, event.data);
    return this.editionService.insert(edition);
  }

}
