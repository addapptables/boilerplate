import { IHasDeletionTime } from './has-deletion-time.interface';

export interface IDeletionAudited extends IHasDeletionTime {
  deleterUserId?: number;
}
