import { Injectable } from '@nestjs/common';
import { Broker } from '@addapptables/microservice';
import { CreateEditionDto } from '../../dtos/create-edition.dto';
import { CreateEditionCommand } from '../../commands/create-edition.command';
import { Edition } from '../../../infrastructure/database/entities/edition.entity';
import { mapper } from '../../../../utils/mapper.util';
import { EditionDto } from '../../dtos/edition.dto';
import { GetEditionDto } from '../../dtos/get-edition.dto';
import { findAllEditionQuery } from '../../queries/get-all-edition.query';
import { PaginatedResultDto } from '../../../../core/dto/paginated-result.dto';
import { UpdateEditionDto } from '../../dtos/update-edition.dto';
import { UpdateEditionCommand } from '../../commands/update-edition.command';
import { CommandDto } from '../../../../core/dto/command.dto';
import { DeleteEditionCommand } from '../../commands/delete-edition.command';
import { FindOneEditionQuery } from '../../queries/find-one-edition.query';
import { FindOneDto } from '../../../../core';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EditionService {

  constructor(private readonly broker: Broker) { }

  async insert(input: CreateEditionDto) {
    input.id = uuid();
    const transferData = await this.broker.start()
      .add(new CreateEditionCommand(input))
      .end<Edition>();
    return mapper(EditionDto, transferData.data);
  }

  async find(input: FindOneDto) {
    const transferData = await this.broker.start()
      .add(new FindOneEditionQuery(input))
      .end<Edition>();
    return mapper(EditionDto, transferData.data);
  }

  async findAll(input: GetEditionDto) {
    const transferData = await this.broker.start()
      .add(new findAllEditionQuery(input))
      .end<PaginatedResultDto<Edition>>();
    const editions = mapper(EditionDto, transferData.data.data, { enableImplicitConversion: true });
    return { total: transferData.data.total, data: editions };
  }

  async Update(input: UpdateEditionDto) {
    const transferData = await this.broker.start()
      .add(new UpdateEditionCommand(input))
      .end<Edition>();
    return mapper(EditionDto, transferData.data);
  }

  async remove(command: CommandDto) {
    await this.broker.start()
      .add(new DeleteEditionCommand(command))
      .end<void>();
    return { id: command.id };
  }

}
