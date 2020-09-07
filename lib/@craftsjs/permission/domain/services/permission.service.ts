import { InjectRepository } from '../../../typeorm';
import { PermissionRepository } from '../../infrastructure/database/repositories/permission.repository';
import { QueryDto } from '../../../core';
import { isEmpty } from '../../../utils';

export class PermissionDomainService {

  constructor(
    @InjectRepository(PermissionRepository)
    private readonly permissionRepository: PermissionRepository,
  ) {
  }

  findAll(input: QueryDto) {
    const query = { isHost: true } as any;
    if (!isEmpty(input.tenantId)) {
      query.isHost = false;
    }
    return this.permissionRepository.find({ where: query });
  }

}
