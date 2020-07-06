import { Provider } from '@nestjs/common';
import {
  AbstractRepository,
  Connection,
  ConnectionOptions,
  Repository,
  getMetadataArgsStorage,
  EntityManager,
} from 'typeorm';
import { ModuleRef } from '@nestjs/core';
import { getConnectionToken, getRepositoryToken } from './common/typeorm.utils';
import { EntityClassOrSchema } from './interfaces/entity-class-or-schema.type';
import { CraftsRepository } from '../core/repositories/crafts.repository';

export function createTypeOrmProviders(
  entities?: EntityClassOrSchema[],
  connection?: Connection | ConnectionOptions | string,
): Provider[] {
  return (entities || []).map((entity) => ({
    provide: getRepositoryToken(entity, connection),
    useFactory: async (connection: Connection, moduleRef: ModuleRef, entityManager: EntityManager) => {
      if (
        entity instanceof Function &&
        (entity.prototype instanceof Repository ||
          entity.prototype instanceof AbstractRepository)
      ) {
        const entityRepositoryMetadataArgs = getMetadataArgsStorage().entityRepositories.find(repository => {
          return repository.target === (entity instanceof Function ? entity : (entity as any).constructor);
        });
        if (!entityRepositoryMetadataArgs)
          throw new Error("No metadata found");

        const repository = await moduleRef.create(entity as any);
        const entityMetadata = entityRepositoryMetadataArgs.entity ? connection.getMetadata(entityRepositoryMetadataArgs.entity) : undefined;
        (repository as any).metadata = entityMetadata;
        (repository as any).manager = entityManager;
        return repository;
      } else if (connection.options.type === 'mongodb') {
        return connection.getMongoRepository(entity);
      } else {
        if (!connection.hasMetadata(entity))
          throw new Error("Repository not found");

        const metadata = connection.getMetadata(entity);
        const repository = (<any>entityManager).repositories.find(repository => repository.metadata === metadata);
        if (repository)
          return repository;

        const repositoryInstance = await moduleRef.create(CraftsRepository);
        Object.assign(repositoryInstance, {
          manager: entityManager,
          metadata: metadata,
          queryRunner: entityManager.queryRunner,
        });

        (<any>entityManager).repositories.push(repositoryInstance);
        return repositoryInstance;
      }
    },
    inject: [
      getConnectionToken(connection),
      ModuleRef,
      EntityManager
    ]
  }));
}
