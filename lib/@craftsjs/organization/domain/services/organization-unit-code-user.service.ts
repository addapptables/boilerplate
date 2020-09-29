import { Injectable } from '@nestjs/common';
import { InjectRepository } from '../../../typeorm/common/typeorm.decorators';
import { OrganizationUnit } from '../../infrastructure/database/entities/organization-unit.entity';
import { OrganizationUnitRole } from '../../infrastructure/database/entities/organization-unit-role.entity';
import { SessionService } from '../../../auth/services/session.service';
import { UserRole } from '../../../user/infrastructure/database/entities/user-role.entity';
import { CraftsRepository } from '../../../core/repositories/crafts.repository';

@Injectable()
export class OrganizationUnitUserService {

    constructor(
        @InjectRepository(OrganizationUnit)
        private readonly organizationUnitRepository: CraftsRepository<OrganizationUnit>,
        @InjectRepository(OrganizationUnitRole)
        private readonly organizationUnitRoleRepository: CraftsRepository<OrganizationUnitRole>,
        @InjectRepository(UserRole)
        private readonly userRoleRepository: CraftsRepository<UserRole>,
        private readonly sessionService: SessionService
    ) { }

    async getOrganizationUnitUser() {
        const userId = this.sessionService.user?.id;
        const userRoleQuery = this.userRoleRepository.createQueryBuilder('userRole')
            .andWhere('userRole.userId = :userId')
            .select('userRole.roleId');

        const organizationUnitRoleQuery = this.organizationUnitRoleRepository
            .createQueryBuilder('organizationUnitRole')
            .andWhere(`EXISTS(${userRoleQuery.andWhere('userRole.roleId = organizationUnitRole.roleId').getQuery()})`)
            .select('organizationUnitRole.organizationUnitId');
        
        const organizationUnit = this.organizationUnitRepository
            .createQueryBuilder('organizationUnit')
            .andWhere(`EXISTS(${organizationUnitRoleQuery.andWhere('organizationUnitRole.organizationUnitId = organizationUnit.id').getQuery()})`)
            .setParameters({ userId })
            .setParameters(organizationUnitRoleQuery.getParameters())
            .getMany();
            
        return organizationUnit;
    }

}