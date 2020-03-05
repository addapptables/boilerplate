import { ISoftDelete } from './soft-delete.interface';

export interface IHasDeletionTime extends ISoftDelete {
  deletionTime?: Date;
}
