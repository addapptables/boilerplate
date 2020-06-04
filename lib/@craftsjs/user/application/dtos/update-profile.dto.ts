import { IsDefined, Length, IsEmail } from 'class-validator';
import { MAX_NAME_LENGTH, MAX_EMAIL_LENGTH } from '../../../config';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateProfileDto {
  @IsDefined()
  @Length(2, MAX_NAME_LENGTH)
  @ApiProperty()
  @Expose()
  userName: string;

  @IsDefined()
  @Length(5, MAX_EMAIL_LENGTH)
  @IsEmail()
  @ApiProperty()
  @Expose()
  emailAddress: string;

  @IsDefined()
  @Length(2, MAX_NAME_LENGTH)
  @ApiProperty()
  @Expose()
  name: string;

  @IsDefined()
  @Length(2, MAX_NAME_LENGTH)
  @ApiProperty()
  @Expose()
  surname: string;
}