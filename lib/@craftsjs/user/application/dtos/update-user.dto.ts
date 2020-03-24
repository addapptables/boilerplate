import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsDefined, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateUserDto extends CreateUserDto {

  @IsDefined()
  @IsUUID('4')
  @Expose()
  @ApiProperty()
  id: string;

}
