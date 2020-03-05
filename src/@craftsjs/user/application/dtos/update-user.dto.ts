import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsDefined, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateUserDto extends CreateUserDto {

  @IsDefined()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

}
