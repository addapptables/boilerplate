import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Broker } from '@addapptables/microservice';
import { FindOneDto } from '@craftsjs/core';
import { mapper } from '@craftsjs/utils/mapper.util';
import { CommandDto } from '@craftsjs/core/dto/command.dto';
import { PaginatedResultDto } from '@craftsjs/core/dto/paginated-result.dto';
import { CreateOrganizationUnitDto } from '../../dtos/create-organization-unit.dto';
import { CreateOrganizationUnitCommand } from '../../commands/create-organization-unit.command';
import { OrganizationUnit } from '../../../infrastructure/database/entities/organization-unit.entity';
import { OrganizationUnitDto } from '../../dtos/organization-unit.dto';
import { GetOrganizationUnitDto } from '../../dtos/get-organization-unit.dto';
import { GetAllOrganizationUnitQuery } from '../../queries/get-all-organization-unit.query';
import { UpdateOrganizationUnitDto } from '../../dtos/update-organization-unit.dto';
import { UpdateOrganizationUnitCommand } from '../../commands/update-organization-unit.command';
import { DeleteOrganizationUnitCommand } from '../../commands/delete-organization-unit.command';
import { FindOneOrganizationUnitQuery } from '../../queries/find-one-organization-unit.query';
import { AddRolesToOrganizationUnitDto } from '../../dtos/add-roles-to-organization-unit.dto';
import { AddRolesToOrganizationUnitCommand } from '../../commands/add-roles-to-organization-unit.command';
import { OrganizationUnitRole } from '../../../../organization/infrastructure/database/entities/organization-unit-role.entity';
import { OrganizationUnitRoleDto } from '../../dtos/organization-unit-role.dto';
import { GetRolesOrganizationUnitQuery } from '../../queries/get-roles-organization-unit.query';
import { Role } from '../../../../role/infrastructure/database/entities/role.entity';
import { RoleDto } from '../../../../role/application/dtos/role.dto';
import { DeleteOrganizationUnitRoleCommand } from '../../commands/delete-organization-unit-role.command';
import { GetRolesAssociateToOrganizationUnitQuery } from '../../queries/get-roles-associate-to-organization-unit.query';

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

  async addRolesToOrganizationUnit(input: AddRolesToOrganizationUnitDto) {
    const transferData = await this.broker.start()
      .add(new AddRolesToOrganizationUnitCommand(input))
      .end<OrganizationUnitRole[]>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(OrganizationUnitRoleDto, transferData.data);
  }

  async getRoles(input: FindOneDto) {
    const transferData = await this.broker.start()
      .add(new GetRolesOrganizationUnitQuery(input))
      .end<Role[]>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(RoleDto, transferData.data);
  }

  async removeRole(input: FindOneDto) {
    const transferData = await this.broker.start()
      .add(new DeleteOrganizationUnitRoleCommand(input))
      .end<void>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return input.id;
  }

  async getRolesAssociate(input: FindOneDto) {
    const transferData = await this.broker.start()
      .add(new GetRolesAssociateToOrganizationUnitQuery(input))
      .end<Role[]>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(RoleDto, transferData.data);
  }

}
