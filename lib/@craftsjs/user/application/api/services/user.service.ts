import { Injectable } from '@nestjs/common';
import { Broker } from '@addapptables/microservice';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { CreateUserCommand } from '../../commands/create-user.command';
import { User } from '../../../../user/infrastructure/database/entities/user.entity';
import { mapper } from '../../../../utils/mapper.util';
import { UserDto } from '../../dtos/user.dto';
import { GetUserDto } from '../../dtos/get-user.dto';
import { FindOneUserQuery } from '../../queries/find-one-user.query';
import { FindAllUserQuery } from '../../queries/find-all-user.query';
import { PaginatedResultDto } from '../../../../core/dto/paginated-result.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UpdateUserCommand } from '../../commands/update-user.command';
import { DeleteUserCommand } from '../../commands/delete-user.command';
import { FindOneDto } from '../../../../core/dto/find-one.dto';
import { FindOneUserDto } from '../../dtos/find-one-user.dto';
import { v4 as uuid } from 'uuid';
import { UpdateProfileCommand } from '../../commands/update-profile.command';
import { ChangePasswordDto } from '../../dtos/change-password.dto';
import { ChangePasswordCommand } from '../../commands/change-password.command';
import { UpdateUserOrganizationUnitDto } from '../../dtos/update-user-organization-unit.dto';
import { UpdateUserOrganizationUnitCommand } from '../../commands/update-user-organization-unit.command';

@Injectable()
export class UserService {

  constructor(private readonly broker: Broker) { }

  async insert(input: CreateUserDto) {
    input.id = uuid();
    const transferData = await this.broker.start()
      .add(new CreateUserCommand(input))
      .end<User>();
    return mapper(UserDto, transferData.data);
  }

  async find(input: FindOneUserDto) {
    const transferData = await this.broker.start()
      .add(new FindOneUserQuery(input))
      .end<User>();
    return mapper(UserDto, transferData.data);
  }

  async findAll(input: GetUserDto) {
    const transferData = await this.broker.start()
      .add(new FindAllUserQuery(input))
      .end<PaginatedResultDto<User>>();
    const users = mapper(UserDto, transferData.data.data);
    return { total: transferData.data.total, data: users };
  }

  async update(input: UpdateUserDto) {
    const transferData = await this.broker.start()
      .add(new UpdateUserCommand(input))
      .end<User>();
    return mapper(UserDto, transferData.data);
  }

  async updateUserOrganizationUnit(input: UpdateUserOrganizationUnitDto) {
    const transferData = await this.broker.start()
      .add(new UpdateUserOrganizationUnitCommand(input))
      .end<User>();
    return mapper(UserDto, transferData.data);
  }

  async updateProfile(input: UpdateUserDto) {
    const transferData = await this.broker.start()
      .add(new UpdateProfileCommand(input))
      .end<User>();
    return mapper(UserDto, transferData.data);
  }

  async changePassword(input: ChangePasswordDto) {
    const transferData = await this.broker.start()
      .add(new ChangePasswordCommand(input))
      .end<User>();
    return mapper(UserDto, transferData.data);
  }

  async remove(input: FindOneDto) {
    await this.broker.start()
      .add(new DeleteUserCommand(input))
      .end<void>();
    return { id: input.id };
  }

}
