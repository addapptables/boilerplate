import { Expose } from 'class-transformer';

export class UserDto {

  @Expose()
  id: number;

  @Expose()
  userName: string;

  @Expose()
  emailAddress: string;

  @Expose()
  name: string;

  @Expose()
  surname: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  isActive?: boolean;

  @Expose()
  creatorUserId: number;

  @Expose()
  lastModifierUserId: number;

}
