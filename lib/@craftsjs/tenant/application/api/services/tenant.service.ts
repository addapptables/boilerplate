import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Broker } from '@addapptables/microservice';
import { CreateTenantDto } from '../../dtos/create-tenant.dto';
import { CreateTenantCommand } from '../../commands/create-tenant.command';
import { Tenant } from '../../../infrastructure/database/entities/tenant.entity';
import { mapper } from '@craftsjs/utils/mapper.util';
import { TenantDto } from '../../dtos/tenant.dto';
import { GetTenantDto } from '../../dtos/get-tenant.dto';
import { GetAllTenantQuery } from '../../queries/get-all-tenant.query';
import { PaginatedResultDto } from '@craftsjs/core/dto/paginated-result.dto';
import { UpdateTenantDto } from '../../dtos/update-tenant.dto';
import { UpdateTenantCommand } from '../../commands/update-tenant.command';
import { CommandDto } from '@craftsjs/core/dto/command.dto';
import { DeleteTenantCommand } from '../../commands/delete-tenant.command';
import { FindOneTenantQuery } from '../../queries/find-one-tenant.query';
import { FindOneDto } from '@craftsjs/core';
import * as uuid from 'uuid/v4';
@Injectable()
export class TenantService {

  constructor(private readonly broker: Broker) { }

  async insert(input: CreateTenantDto) {
    input.id = uuid();
    const transferData = await this.broker.start()
      .add(new CreateTenantCommand(input))
      .end<Tenant>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(TenantDto, transferData.data);
  }

  async find(input: FindOneDto) {
    const transferData = await this.broker.start()
      .add(new FindOneTenantQuery(input))
      .end<Tenant>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(TenantDto, transferData.data);
  }

  async findAll(input: GetTenantDto) {
    const transferData = await this.broker.start()
      .add(new GetAllTenantQuery(input))
      .end<PaginatedResultDto<Tenant>>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    const tenants = mapper(TenantDto, transferData.data.data);
    return { total: transferData.data.total, data: tenants };
  }

  async update(input: UpdateTenantDto) {
    const transferData = await this.broker.start()
      .add(new UpdateTenantCommand(input))
      .end<Tenant>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(TenantDto, transferData.data);
  }

  async remove(command: CommandDto) {
    const transferData = await this.broker.start()
      .add(new DeleteTenantCommand(command))
      .end<void>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return command.id;
  }

}
