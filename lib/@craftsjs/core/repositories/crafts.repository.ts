import { Repository, ObjectID, FindOneOptions, FindConditions, FindManyOptions } from 'typeorm';
import { FullAuditedEntity } from '../abstract-entities';
import { SessionService } from '../../auth/services/session.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CraftsRepository<Entity> extends Repository<Entity> {

  constructor(public readonly sessionService: SessionService) {
    super();
  }

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
    const column = this.metadata.findColumnWithPropertyName('tenantId');
    if (column !== undefined) {
      const where = Object.assign({}, options?.where || {}, { tenantId: this.sessionService.tenantId });
      options.where = where;
    }
    if ((this.target as any).prototype instanceof FullAuditedEntity) {
      const where = Object.assign({}, options?.where || {}, { isDeleted: false });
      options.where = where;
    }
    return options;
  }

  createQueryBuilder(name?: string) {
    let query = super.createQueryBuilder();
    if ((this.target as any).prototype instanceof FullAuditedEntity) {
      if (name) {
        query = super.createQueryBuilder(name)
          .where(`"${name}"."isDeleted" = false`);
      } else {
        query = super.createQueryBuilder()
          .where(`"isDeleted" = false`);
      }
    } else {
      if (name) {
        query = super.createQueryBuilder(name);
      } else {
        query = super.createQueryBuilder();
      }
    }
    const column = this.metadata.findColumnWithPropertyName('tenantId');
    if (column !== undefined && name) {
      query = query.andWhere(`"${name}"."tenantId" = :tenantId`, { tenantId: this.sessionService.tenantId });
    } else if (column !== undefined) {
      query = query.andWhere(`"tenantId" = :tenantId`, { tenantId: this.sessionService.tenantId });
    }
    return query;
  }

}
