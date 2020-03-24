import { IsDefined, IsArray, ArrayMinSize, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CommandDto } from '@craftsjs/core/dto/command.dto';

export class AddRolesToOrganizationUnitDto extends CommandDto {

  @Expose()
  @ApiProperty()
  @IsDefined()
  @IsUUID('4')
  organizationUnitId: string;

  @Expose()
  @ApiProperty({ type: 'array', items: { type: 'string' } })
  @IsDefined()
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  roles: string[];

}
