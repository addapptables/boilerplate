import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Broker } from '@addapptables/microservice';
import { CreateTenantDto } from '../../dtos/create-tenant.dto';
import { CreateTenantCommand } from '../../commands/create-tenant.command';
import { Tenant } from '../../../infrastructure/database/entities/tenant.entity';
import { mapper } from '../../../../utils/mapper.util';
import { TenantDto } from '../../dtos/tenant.dto';
import { GetTenantDto } from '../../dtos/get-tenant.dto';
import { FindAllTenantQuery } from '../../queries/find-all-tenant.query';
import { PaginatedResultDto } from '../../../../core/dto/paginated-result.dto';
import { UpdateTenantDto } from '../../dtos/update-tenant.dto';
import { UpdateTenantCommand } from '../../commands/update-tenant.command';
import { CommandDto } from '../../../../core/dto/command.dto';
import { DeleteTenantCommand } from '../../commands/delete-tenant.command';
import { FindOneTenantQuery } from '../../queries/find-one-tenant.query';
import * as uuid from 'uuid/v4';
import { FindOneTenantDto } from '../../dtos/find-one-tenant.dto';
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

  async isTenantAvailable(input: FindOneTenantDto) {
    input.isActive = true;
    return this.find(input);
  }

  async find(input: FindOneTenantDto) {
    const transferData = await this.broker.start()
      .add(new FindOneTenantQuery(input))
      .end<Tenant>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(TenantDto, transferData.data) || {};
  }

  async findAll(input: GetTenantDto) {
    const transferData = await this.broker.start()
      .add(new FindAllTenantQuery(input))
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
    return { id: command.id };
  }

}
