import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Broker } from '@addapptables/microservice';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { CreateUserCommand } from '../../commands/create-user.command';
import { User } from '@craftsjs/user/infrastructure/database/entities/user.entity';
import { mapper } from '@craftsjs/utils/mapper.util';
import { UserDto } from '../../dtos/user.dto';
import { GetUserDto } from '../../dtos/get-user.dto';
import { FindOneUserQuery } from '../../queries/find-one-user.query';
import { GetAllUserQuery } from '../../queries/get-all-user.query';
import { PaginatedResultDto } from '@craftsjs/core/dto/paginated-result.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UpdateUserCommand } from '../../commands/update-user.command';
import { DeleteUserCommand } from '../../commands/delete-user.command';
import { FindOneDto } from '../../../../core/dto/find-one.dto';
import { FindOneUserDto } from '../../dtos/find-one-user.dto';
import * as uuid from 'uuid/v4';

@Injectable()
export class UserService {

  constructor(private readonly broker: Broker) { }

  async insert(input: CreateUserDto) {
    input.id = uuid();
    const transferData = await this.broker.start()
      .add(new CreateUserCommand(input))
      .end<User>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(UserDto, transferData.data);
  }

  async find(input: FindOneUserDto) {
    const transferData = await this.broker.start()
      .add(new FindOneUserQuery(input))
      .end<User>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(UserDto, transferData.data);
  }

  async findAll(input: GetUserDto) {
    const transferData = await this.broker.start()
      .add(new GetAllUserQuery(input))
      .end<PaginatedResultDto<User>>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    const users = mapper(UserDto, transferData.data.data);
    return { total: transferData.data.total, data: users };
  }

  async update(input: UpdateUserDto) {
    const transferData = await this.broker.start()
      .add(new UpdateUserCommand(input))
      .end<User>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(UserDto, transferData.data);
  }

  async remove(input: FindOneDto) {
    const transferData = await this.broker.start()
      .add(new DeleteUserCommand(input))
      .end<void>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return input.id;
  }

}
