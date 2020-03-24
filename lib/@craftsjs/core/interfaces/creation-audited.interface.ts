import { IHasCreationTime } from './has-creation-time.interface';

export interface ICreationAudited extends IHasCreationTime {

  creatorUserId?: string;

}
