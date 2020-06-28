import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsUUID } from "class-validator";

export class ImpersonateInput {
    
    @Expose()
    @ApiProperty()
    @IsDefined()
    @IsUUID('4')
    tenantImpersonationId?: string;

    @Expose()
    @ApiProperty()
    @IsDefined()
    @IsUUID('4')
    userId?: string;
}
