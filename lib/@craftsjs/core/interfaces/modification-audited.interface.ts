import { IHasModificationTime } from './has-modification-time.interface';

export interface IModificationAudited extends IHasModificationTime {

  lastModifierUserId?: string;

}
