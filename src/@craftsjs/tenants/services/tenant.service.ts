import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from '../entities/tenant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TenantService {

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) { }

  getTenantBySubdomain(subDomain: string) {
    return this.tenantRepository.findOne({
      where: {
        subDomain,
      },
    });
  }

}
