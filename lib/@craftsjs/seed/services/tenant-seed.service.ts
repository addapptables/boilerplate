import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@craftsjs/typeorm';
import { TenantRepository } from '@craftsjs/tenant/infrastructure/database/repositories/tenant.repository';
import seedConfiguration from '../static';

@Injectable()
export class TenantSeedService {

    constructor(
        @InjectRepository(TenantRepository)
        private readonly tenantRepository: TenantRepository
    ) { }

    async seed() {
        const tenant = await this.tenantRepository.findOne({ where: { id: seedConfiguration.tenantId } });
        if (!tenant) {
            await this.tenantRepository.insert({
                id: seedConfiguration.tenantId,
                name: 'Default',
                subDomain: 'default',
                isActive: true,
            });
        }
    }

}
