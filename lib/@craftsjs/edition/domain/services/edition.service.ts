import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@craftsjs/typeorm';
import { AlreadyExists } from '../../../core/exceptions/already-exists.exception';
import { removeEmpty, mergeAndRemoveEmpty } from '../../../utils';
import { CrudAppService } from '../../../core/services/crud-app.service';
import { FindOneDto } from '../../../core/dto/find-one.dto';
import { EditionRepository } from '../../../edition/infrastructure/database/repositories/edition.repository';
import { Edition } from '../../../edition/infrastructure/database/entities/edition.entity';

@Injectable()
export class EditionDomainService extends CrudAppService<EditionRepository> {

  constructor(
    @InjectRepository(EditionRepository)
    private readonly editionRepository: EditionRepository,
  ) {
    super(editionRepository);
  }

  async insert(edition: Edition): Promise<Edition> {
    const query = removeEmpty({ name: edition.name });
    const existsEditionName = await this.editionRepository.findOne({ where: query });
    if (existsEditionName) {
      throw new AlreadyExists('edition.existsName');
    }
    return super.insert(edition);
  }

  async update(edition: Edition): Promise<Edition> {
    const editionDb = await this.editionRepository.findOne({ where: { id: edition.id } });
    if (edition.name !== editionDb.name) {
      const query = removeEmpty({ name: edition.name });
      const existsEditionName = await this.editionRepository.findOne({ where: query });
      if (existsEditionName) {
        throw new AlreadyExists('edition.existsName');
      }
    }
    const editionToUpdate = Object.assign({}, editionDb, edition);
    await super.update(editionToUpdate);
    return editionToUpdate;
  }

  findOneByQuery(editionQuery: FindOneDto) {
    const query = mergeAndRemoveEmpty(editionQuery)({});
    return this.editionRepository.findOne({
      where: query,
    });
  }

}
