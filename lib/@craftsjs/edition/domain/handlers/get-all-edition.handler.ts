import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { findAllEditionQuery } from '../../application/queries/get-all-edition.query';
import { EditionDomainService } from '../services/edition.service';

@QueryHandler(findAllEditionQuery)
export class findAllEditionHandler implements IQueryHandler<findAllEditionQuery> {

  constructor(private readonly editionService: EditionDomainService) { }

  handle(event: findAllEditionQuery): any {
    return this.editionService.findAll(event.data);
  }

}
