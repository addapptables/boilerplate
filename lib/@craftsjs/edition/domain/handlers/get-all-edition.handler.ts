import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { GetAllEditionQuery } from '../../application/queries/get-all-edition.query';
import { EditionDomainService } from '../services/edition.service';

@QueryHandler(GetAllEditionQuery)
export class GetAllEditionHandler implements IQueryHandler<GetAllEditionQuery> {

  constructor(private readonly editionService: EditionDomainService) { }

  handle(event: GetAllEditionQuery): any {
    return this.editionService.getAll(event.data);
  }

}
