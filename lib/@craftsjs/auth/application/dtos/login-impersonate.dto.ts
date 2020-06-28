import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class ImpersonateDto {

    @Expose()
    @ApiProperty()
    impersonationToken: string;

}
