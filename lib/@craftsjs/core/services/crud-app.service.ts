import { CraftsRepository } from '../repositories/crafts.repository';
import { EntityDto } from '../dto/entity.dto';
import { PaginatedDto } from '../dto/paginated.dto';
import { PaginatedResultDto } from '../dto/paginated-result.dto';
import * as R from 'ramda';
import { FindOneDto } from '../dto/find-one.dto';
import { mergeAndRemoveEmpty } from '../../utils';

export abstract class CrudAppService<T extends CraftsRepository<any>> {

  constructor(public readonly repository: T) { }

  insert(input: any) {
    return this.repository.save(input);
  }

  async update(input: EntityDto): Promise<any> {
    await this.repository.update(input.id, input as any);
    return input;
  }

  get(input: EntityDto) {
    return this.repository.findOne({ where: { id: input.id } });
  }

  async findAll(input: PaginatedDto) {
    const query = R.omit(['skip', 'take', 'currentUserId'], R.reject(R.isNil, input));
    const data = await this.repository.findAndCount({ skip: input.skip, take: input.take, where: query });
    return {
      data: data[0],
      total: data[1],
    } as PaginatedResultDto<any>;
  }

  async remove(id: string) {
    const data = await this.repository.findOne({ where: { id } });
    return await this.repository.remove(data);
  }

  createQueryBuilder(name?: string) {
    return this.repository.createQueryBuilder(name);
  }

  findOneByQuery(findQuery: FindOneDto) {
    const query = mergeAndRemoveEmpty(findQuery)({});
    return this.repository.findOne({
      where: query,
    });
  }

}
