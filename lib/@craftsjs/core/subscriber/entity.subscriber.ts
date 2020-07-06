import { EntitySubscriberInterface, InsertEvent, UpdateEvent, Connection, EventSubscriber } from 'typeorm';
import { Entity } from '../abstract-entities/abstract-entity';
import { CreationAuditedEntity } from '../abstract-entities/creation-audited';
import { AuditedEntity } from '../abstract-entities/audited';
import { FullAuditedEntity } from '../abstract-entities/full-audited';
import { SessionService } from '../../auth/services/session.service';
import { IMayHaveTenant } from '../interfaces';

@EventSubscriber()
export class EntitySubscriber implements EntitySubscriberInterface {

  constructor(
    connection: Connection,
    private readonly sessionService: SessionService,
  ) {
    connection.subscribers.push(this);
  }

  beforeInsert(event: InsertEvent<Entity>) {
    if (event.entity as CreationAuditedEntity) {
      const entity = event.entity as CreationAuditedEntity;
      entity.creationTime = new Date();
      entity.creatorUserId = this.sessionService.user?.id;
    }
    if (event.entity as FullAuditedEntity) {
      const entity = event.entity as FullAuditedEntity;
      entity.isDeleted = false;
    }
    if(event.metadata.findColumnWithPropertyName('tenantId') !== undefined) {
      const entity = event.entity as IMayHaveTenant;
      !entity.tenantId && (entity.tenantId = this.sessionService.tenantId);
    };
  }

  beforeUpdate(event: UpdateEvent<Entity>) {
    if (event.entity as AuditedEntity) {
      const entity = event.entity as AuditedEntity;
      entity.lastModificationTime = new Date();
      entity.lastModifierUserId = this.sessionService.user?.id;
    }
    if(event.metadata.findColumnWithPropertyName('tenantId') !== undefined) {
      const entity = event.entity as IMayHaveTenant;
      !entity.tenantId && (entity.tenantId = this.sessionService.tenantId);
    };
  }
}
