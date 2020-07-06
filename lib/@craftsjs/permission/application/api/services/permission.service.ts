import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { Broker } from '@addapptables/microservice';
import { QueryDto } from '../../../../core/dto/query.dto';
import { Permission } from '../../../infrastructure/database/entities/permission.entity';
import { FindAllPermissionQuery } from '../../queries/find-all-permission.query';
import { PermissionDto } from '../../dtos/permission.dto';
import { mapper } from '../../../../utils/mapper.util';

@Injectable()
export class PermissionService {

  constructor(private readonly broker: Broker) { }

  async findAll(input: QueryDto) {
    const transferData = await this.broker.start()
      .add(new FindAllPermissionQuery(input))
      .end<Permission[]>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(PermissionDto, transferData.data);
  }

}
