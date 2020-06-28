import { Repository, ObjectID, FindOneOptions, FindConditions, FindManyOptions } from 'typeorm';
import { FullAuditedEntity } from '../abstract-entities';

export class CraftsRepository<Entity> extends Repository<Entity> {

  findOne(optionsOrConditions?: string | number | Date | ObjectID | FindOneOptions<Entity> | FindConditions<Entity>,
    maybeOptions?: FindOneOptions<Entity>): Promise<Entity | undefined> {
    let options = optionsOrConditions as FindOneOptions;
    if (maybeOptions) {
      options = maybeOptions;
    }
    optionsOrConditions = Object.assign({}, this.getDefaultOptions(options));
    return super.findOne(optionsOrConditions as any, maybeOptions);
  }

  findOneOrFail(optionsOrConditions?: string | number | Date | ObjectID | FindOneOptions<Entity> | FindConditions<Entity>,
    maybeOptions?: FindOneOptions<Entity>): Promise<Entity> {
    let options = optionsOrConditions as FindOneOptions;
    if (maybeOptions) {
      options = maybeOptions;
    }
    optionsOrConditions = Object.assign({}, this.getDefaultOptions(options));
    return super.findOneOrFail(optionsOrConditions as any, maybeOptions);
  }

  findAndCount(optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>): Promise<[Entity[], number]> {
    optionsOrConditions = Object.assign({}, optionsOrConditions || {}, this.getDefaultOptions(optionsOrConditions));
    return super.findAndCount(optionsOrConditions as any);
  }

  find(optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>): Promise<Entity[]> {
    optionsOrConditions = Object.assign({}, optionsOrConditions || {}, this.getDefaultOptions(optionsOrConditions));
    return super.find(optionsOrConditions as any);
  }

  count(optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>): Promise<number> {
    optionsOrConditions = Object.assign({}, optionsOrConditions || {}, this.getDefaultOptions(optionsOrConditions));
    return super.count(optionsOrConditions as any);
  }

  private getDefaultOptions(maybeOptions?: FindOneOptions<Entity>) {
    const options = Object.assign({}, maybeOptions || {});
    if((this.target as any).prototype instanceof FullAuditedEntity) {
      const where = Object.assign({}, maybeOptions?.where || {}, { isDeleted: false  });
      options.where = where;
    }
    return options;
  }

  createQueryBuilder(name?: string) {
    var query = super.createQueryBuilder(name);
    if((this.target as any).prototype instanceof FullAuditedEntity) {
      if(name){
        return super.createQueryBuilder(name)
        .where(`"${name}"."isDeleted" = false`);
      }else {
        return super.createQueryBuilder(name)
        .where(`"isDeleted" = false`);
      }
    }
    return query;
  }

}
