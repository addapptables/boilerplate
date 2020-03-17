import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Broker } from '@addapptables/microservice';
import { CreateOrganizationUnitDto } from '../../dtos/create-organization-unit.dto';
import { CreateOrganizationUnitCommand } from '../../commands/create-organization-unit.command';
import { OrganizationUnit } from '../../../infrastructure/database/entities/organization-unit.entity';
import { mapper } from '@craftsjs/utils/mapper.util';
import { OrganizationUnitDto } from '../../dtos/organization-unit.dto';
import { GetOrganizationUnitDto } from '../../dtos/get-organization-unit.dto';
import { GetAllOrganizationUnitQuery } from '../../queries/get-all-organization-unit.query';
import { PaginatedResultDto } from '@craftsjs/core/dto/paginated-result.dto';
import { UpdateOrganizationUnitDto } from '../../dtos/update-organization-unit.dto';
import { UpdateOrganizationUnitCommand } from '../../commands/update-organization-unit.command';
import { CommandDto } from '@craftsjs/core/dto/command.dto';
import { DeleteOrganizationUnitCommand } from '../../commands/delete-organization-unit.command';
import { FindOneOrganizationUnitQuery } from '../../queries/find-one-organization-unit.query';
import { FindOneDto } from '@craftsjs/core';

@Injectable()
export class OrganizationUnitService {

  constructor(private readonly broker: Broker) { }

  async insert(input: CreateOrganizationUnitDto) {
    const transferData = await this.broker.start()
      .add(new CreateOrganizationUnitCommand(input))
      .end<OrganizationUnit>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(OrganizationUnitDto, transferData.data);
  }

  async find(input: FindOneDto) {
    const transferData = await this.broker.start()
      .add(new FindOneOrganizationUnitQuery(input))
      .end<OrganizationUnit>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(OrganizationUnitDto, transferData.data);
  }

  async findAll(input: GetOrganizationUnitDto) {
    const transferData = await this.broker.start()
      .add(new GetAllOrganizationUnitQuery(input))
      .end<PaginatedResultDto<OrganizationUnit>>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    const organizationUnits = mapper(OrganizationUnitDto, transferData.data.data);
    return { total: transferData.data.total, data: organizationUnits };
  }

  async Update(input: UpdateOrganizationUnitDto) {
    const transferData = await this.broker.start()
      .add(new UpdateOrganizationUnitCommand(input))
      .end<OrganizationUnit>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(OrganizationUnitDto, transferData.data);
  }

  async remove(command: CommandDto) {
    const transferData = await this.broker.start()
      .add(new DeleteOrganizationUnitCommand(command))
      .end<void>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return command.id;
  }

}
