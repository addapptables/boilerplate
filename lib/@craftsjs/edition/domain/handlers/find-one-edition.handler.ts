import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { EditionDomainService } from '../services/edition.service';
import { FindOneEditionQuery } from '../../application/queries/find-one-edition.query';

@QueryHandler(FindOneEditionQuery)
export class FindOneEditionHandler implements IQueryHandler<FindOneEditionQuery> {

  constructor(private readonly editionService: EditionDomainService) { }

  handle(event: FindOneEditionQuery): any {
    return this.editionService.findOneByQuery(event.data);
  }

}
