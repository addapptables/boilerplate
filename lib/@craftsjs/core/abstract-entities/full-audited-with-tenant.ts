import { Column } from 'typeorm';
import { Expose } from 'class-transformer';
import { FullAuditedEntity } from "./full-audited";
import { IMayHaveTenant } from "../interfaces";

export class FullAuditedWithTenant extends FullAuditedEntity implements IMayHaveTenant {

    @Column({ nullable: true })
    @Expose()
    tenantId?: string;
}
