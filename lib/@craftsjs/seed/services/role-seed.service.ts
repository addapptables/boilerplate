import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@craftsjs/typeorm';
import { RoleRepository } from '@craftsjs/role/infrastructure/database/repositories/role.repository';
import seedConfiguration from '../static';

@Injectable()
export class RoleSeedService {

    constructor(
        @InjectRepository(RoleRepository)
        private readonly roleRepository: RoleRepository,
    ) { }

    async seed() {
        await this.createHostRole();
        await this.createTenantRole();
    }

    async createHostRole() {
        const role = await this.roleRepository.findOne({ where: { id: seedConfiguration.role.hostId } });
        if(!role) {
            await this.roleRepository.insert({
                isStatic: true,
                isDefault: false,
                name: seedConfiguration.role.name,
                id: seedConfiguration.role.hostId
            });
        }
    }

    async createTenantRole() {
        const role = await this.roleRepository.findOne({ 
            where: { id: seedConfiguration.role.tenantId } 
        });
        if(!role) {
            await this.roleRepository.insert({
                isStatic: true,
                isDefault: false,
                name: seedConfiguration.role.name,
                tenantId: seedConfiguration.tenantId,
                id: seedConfiguration.role.tenantId
            });
        }
    }

}