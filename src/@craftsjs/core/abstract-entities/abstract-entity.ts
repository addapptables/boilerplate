import { PrimaryGeneratedColumn } from 'typeorm';
import { IEntity } from '../interfaces/entity.interface';
import { Expose } from 'class-transformer';

export class Entity implements IEntity {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

}
