import { IsDefined, IsNumber, IsArray, ArrayMinSize } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CommandDto } from '@craftsjs/core/dto/command.dto';

export class AddRolesToOrganizationUnitDto extends CommandDto {

  @Expose()
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  organizationUnitId: number;

  @Expose()
  @ApiProperty({ type: 'array', items: { type: 'number' } })
  @IsDefined()
  @IsArray()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  @ArrayMinSize(1)
  roles: number[];

}
