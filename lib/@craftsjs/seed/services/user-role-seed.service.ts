import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@craftsjs/typeorm';
import { UserRole } from '@craftsjs/user';
import { CraftsRepository } from '@craftsjs/core';
import seedConfiguration from '../static';

@Injectable()
export class UserRoleSeedService {

    constructor(
        @InjectRepository(UserRole)
        private readonly userRoleRepository: CraftsRepository<UserRole>
    ) { }

    async seed() {
        await this.createUserRoleHost();
        await this.createUserRoleTenant();
    }

    private async createUserRoleHost() {
        const userRole = await this.userRoleRepository.findOne({ where: { id: 'bf2fb78b-393c-408c-83f2-183e24593eaf' } });
        if (!userRole) {
            await this.userRoleRepository.insert({
                id: 'bf2fb78b-393c-408c-83f2-183e24593eaf',
                roleId: seedConfiguration.role.hostId,
                userId: seedConfiguration.user.hostId
            })
        }
    }

    private async createUserRoleTenant() {
        const userRole = await this.userRoleRepository.findOne({ where: { id: 'ff638c57-19dd-409c-bf51-c0aab068b5a6' } });
        if (!userRole) {
            await this.userRoleRepository.insert({
                id: 'ff638c57-19dd-409c-bf51-c0aab068b5a6',
                roleId: seedConfiguration.role.tenantId,
                userId: seedConfiguration.user.tenantId
            });
        }
    }

}