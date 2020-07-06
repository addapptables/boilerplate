import { Expose } from "class-transformer";
import { IsDefined, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserOrganizationUnitDto {

    @Expose()
    @IsDefined()
    @IsUUID('4')
    @ApiProperty()
    organizationUnitId: string;

}