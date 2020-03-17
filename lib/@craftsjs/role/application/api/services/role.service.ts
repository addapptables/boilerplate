import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Broker } from '@addapptables/microservice';
import { CreateRoleDto } from '../../dtos/create-role.dto';
import { CreateRoleCommand } from '../../commands/create-role.command';
import { Role } from '@craftsjs/role/infrastructure/database/entities/role.entity';
import { mapper } from '@craftsjs/utils/mapper.util';
import { RoleDto } from '../../dtos/role.dto';
import { GetRoleDto } from '../../dtos/get-role.dto';
import { GetAllRoleQuery } from '../../queries/get-all-role.query';
import { PaginatedResultDto } from '@craftsjs/core/dto/paginated-result.dto';
import { UpdateRoleDto } from '../../dtos/update-role.dto';
import { UpdateRoleCommand } from '../../commands/update-role.command';
import { CommandDto } from '@craftsjs/core/dto/command.dto';
import { DeleteRoleCommand } from '../../commands/delete-role.command';
import { FindOneRoleQuery } from '../../queries/find-one-role.query';
import { FindOneDto } from '@craftsjs/core';

@Injectable()
export class RoleService {

  constructor(private readonly broker: Broker) { }

  async insert(input: CreateRoleDto) {
    const transferData = await this.broker.start()
      .add(new CreateRoleCommand(input))
      .end<Role>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(RoleDto, transferData.data);
  }

  async find(input: FindOneDto) {
    const transferData = await this.broker.start()
      .add(new FindOneRoleQuery(input))
      .end<Role>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(RoleDto, transferData.data);
  }

  async findAll(input: GetRoleDto) {
    const transferData = await this.broker.start()
      .add(new GetAllRoleQuery(input))
      .end<PaginatedResultDto<Role>>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    const roles = mapper(RoleDto, transferData.data.data);
    return { total: transferData.data.total, data: roles };
  }

  async Update(input: UpdateRoleDto) {
    const transferData = await this.broker.start()
      .add(new UpdateRoleCommand(input))
      .end<Role>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(RoleDto, transferData.data);
  }

  async remove(command: CommandDto) {
    const transferData = await this.broker.start()
      .add(new DeleteRoleCommand(command))
      .end<void>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return command.id;
  }

}
