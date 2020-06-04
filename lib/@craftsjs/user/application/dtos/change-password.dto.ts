import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class ChangePasswordDto {

  id: string;

  @ApiProperty()
  @Expose()
  @IsDefined()
  currentPassword: string;

  @ApiProperty()
  @Expose()
  @IsDefined()
  newPassword: string;

}