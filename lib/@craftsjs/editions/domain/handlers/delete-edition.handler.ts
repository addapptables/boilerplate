import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { EditionDomainService } from '../services/edition.service';
import { DeleteEditionCommand } from '../../application/commands/delete-edition.command';

@CommandHandler(DeleteEditionCommand)
export class DeleteEditionHandler implements ICommandHandler<DeleteEditionCommand> {

  constructor(
    private readonly editionService: EditionDomainService,
  ) { }

  handle(event: DeleteEditionCommand): any {
    return this.editionService.remove(event.data.id, event.data.currentUserId);
  }

}
