import { Length, IsEmail, IsBoolean, IsDefined } from 'class-validator';
import { MAX_NAME_LENGTH, MAX_EMAIL_LENGTH } from '../../../config';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CommandDto } from '../../../core/dto/command.dto';

export class CreateUserDto extends CommandDto {

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

  @ApiProperty({ required: false })
  @Expose()
  phoneNumber?: string;

  @IsBoolean()
  @ApiProperty({ required: false })
  @Expose()
  isActive?: boolean;

}
