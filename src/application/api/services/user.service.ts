import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Broker } from '@addapptables/microservice';
import { CreateUserDto, UpdateUserCommand, DeleteUserCommand, GetUserQuery } from '@craftsjs/user';
import { CreateUserCommand, User, GetUsersQuery, GetUserDto, UpdateUserDto } from '@craftsjs/user';
import { mapper } from '@craftsjs/utils';
import { UserDto } from '@craftsjs/user';
import { PaginatedResultDto, CommandDto } from '@craftsjs/core';

@Injectable()
export class UserService {

  constructor(private readonly broker: Broker) { }

  async insert(input: CreateUserDto) {
    const transferData = await this.broker.start()
      .add(new CreateUserCommand(input))
      .end<User>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(UserDto, transferData.data);
  }

  async find(input: GetUserDto) {
    const transferData = await this.broker.start()
      .add(new GetUserQuery(input))
      .end<User>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(UserDto, transferData.data);
  }

  async findAll(input: GetUserDto) {
    const transferData = await this.broker.start()
      .add(new GetUsersQuery(input))
      .end<PaginatedResultDto<User>>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    const users = mapper(UserDto, transferData.data.data);
    return { total: transferData.data.total, data: users };
  }

  async Update(input: UpdateUserDto) {
    const transferData = await this.broker.start()
      .add(new UpdateUserCommand(input))
      .end<User>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(UserDto, transferData.data);
  }

  async remove(command: CommandDto) {
    const transferData = await this.broker.start()
      .add(new DeleteUserCommand(command))
      .end<void>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return command.id;
  }

}
