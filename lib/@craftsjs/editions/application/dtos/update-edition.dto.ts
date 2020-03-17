import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateEditionDto } from './create-edition.dto';

export class UpdateEditionDto extends CreateEditionDto {

  @IsDefined()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

}
