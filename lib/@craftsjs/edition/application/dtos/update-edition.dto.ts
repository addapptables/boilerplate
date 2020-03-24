import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateEditionDto } from './create-edition.dto';

export class UpdateEditionDto extends CreateEditionDto {

  @IsDefined()
  @IsUUID('4')
  @Expose()
  @ApiProperty()
  id: string;

}
