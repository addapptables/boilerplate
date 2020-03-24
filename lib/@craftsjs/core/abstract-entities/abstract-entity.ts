import { PrimaryColumn } from 'typeorm';
import { IEntity } from '../interfaces/entity.interface';
import { Expose } from 'class-transformer';

export class Entity implements IEntity {

  @PrimaryColumn({ type: 'uuid' })
  @Expose()
  id: string;

}
