import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Broker } from '@addapptables/microservice';
import { CreateEditionDto } from '../../dtos/create-edition.dto';
import { CreateEditionCommand } from '../../commands/create-edition.command';
import { Edition } from '../../../infrastructure/database/entities/edition.entity';
import { mapper } from '@craftsjs/utils/mapper.util';
import { EditionDto } from '../../dtos/edition.dto';
import { GetEditionDto } from '../../dtos/get-edition.dto';
import { findAllEditionQuery } from '../../queries/get-all-edition.query';
import { PaginatedResultDto } from '@craftsjs/core/dto/paginated-result.dto';
import { UpdateEditionDto } from '../../dtos/update-edition.dto';
import { UpdateEditionCommand } from '../../commands/update-edition.command';
import { CommandDto } from '@craftsjs/core/dto/command.dto';
import { DeleteEditionCommand } from '../../commands/delete-edition.command';
import { FindOneEditionQuery } from '../../queries/find-one-edition.query';
import { FindOneDto } from '@craftsjs/core';
import * as uuid from 'uuid/v4';

@Injectable()
export class EditionService {

  constructor(private readonly broker: Broker) { }

  async insert(input: CreateEditionDto) {
    input.id = uuid();
    const transferData = await this.broker.start()
      .add(new CreateEditionCommand(input))
      .end<Edition>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(EditionDto, transferData.data);
  }

  async find(input: FindOneDto) {
    const transferData = await this.broker.start()
      .add(new FindOneEditionQuery(input))
      .end<Edition>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(EditionDto, transferData.data);
  }

  async findAll(input: GetEditionDto) {
    const transferData = await this.broker.start()
      .add(new findAllEditionQuery(input))
      .end<PaginatedResultDto<Edition>>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    const editions = mapper(EditionDto, transferData.data.data);
    return { total: transferData.data.total, data: editions };
  }

  async Update(input: UpdateEditionDto) {
    const transferData = await this.broker.start()
      .add(new UpdateEditionCommand(input))
      .end<Edition>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return mapper(EditionDto, transferData.data);
  }

  async remove(command: CommandDto) {
    const transferData = await this.broker.start()
      .add(new DeleteEditionCommand(command))
      .end<void>();
    if (transferData.error) {
      throw new InternalServerErrorException(transferData.error);
    }
    return command.id;
  }

}
