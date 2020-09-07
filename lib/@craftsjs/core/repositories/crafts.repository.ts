import { Repository, ObjectID, FindOneOptions, FindConditions, FindManyOptions, RemoveOptions } from 'typeorm';
import { FullAuditedEntity } from '../abstract-entities';
import { SessionService } from '../../auth/services/session.service';
import { Injectable } from '@nestjs/common';
import { OptionService } from '../disposable/option.service';
import { isArray } from 'util';

@Injectable()
export class CraftsRepository<Entity> extends Repository<Entity> {

  constructor(
    public readonly sessionService: SessionService,
    public readonly optionService: OptionService
  ) {
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

  remove(entities: Entity[], options?: RemoveOptions): Promise<Entity[]>;
  remove(entity: Entity, options?: RemoveOptions): Promise<Entity>;
  async remove(entity: Entity | Entity[], options?: RemoveOptions): Promise<Entity | Entity[]> {
    if (isArray(entity)) {
      const allPromise = entity.map(async x=> this.removeSingleEntity(x, options));
      const entities = await Promise.all(allPromise);
      return entities;
    } else {
      return this.removeSingleEntity(entity, options);
    }
  }

  private async removeSingleEntity(entity: Entity, options?: RemoveOptions): Promise<Entity> {
    if((this.target as any).prototype instanceof FullAuditedEntity) {
      (entity as any).isDeleted = true;
      (entity as any).deletionTime = new Date();
      (entity as any).deleterUserId = this.sessionService.user?.id;
      await super.update((entity as any).id, entity);
      return entity;
    }else {
      return super.remove(entity, options);
    }
  }

  private getDefaultOptions(maybeOptions?: FindOneOptions<Entity>) {
    const options = Object.assign({}, maybeOptions || {});
    // tenant default filter
    if (this.optionService.getOptions?.defaultFilter?.applyTenant) {
      const column = this.metadata.findColumnWithPropertyName('tenantId');
      if (column !== undefined) {
        const where = Object.assign({}, options?.where || {}, { tenantId: this.sessionService.tenantId });
        options.where = where;
      }
    }

    // is deleted default filter
    if (this.optionService.getOptions?.defaultFilter?.applyIsDeleted) {
      if ((this.target as any).prototype instanceof FullAuditedEntity) {
        const where = Object.assign({}, options?.where || {}, { isDeleted: false });
        options.where = where;
      }
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
          .where('"isDeleted" = false');
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
      if (this.sessionService.tenantId) {
        query = query.andWhere(`"${name}"."tenantId" = :tenantId`, { tenantId: this.sessionService.tenantId });
      } else {
        query = query.andWhere(`"${name}"."tenantId" IS NULL`);
      }
    } else if (column !== undefined) {
      if (this.sessionService.tenantId) {
        query = query.andWhere('"tenantId" = :tenantId', { tenantId: this.sessionService.tenantId });
      } else {
        query = query.andWhere('"tenantId" IS NULL');
      }
    }
    return query;
  }

}
