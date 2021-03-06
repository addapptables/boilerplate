import { Module } from '@nestjs/common';
import { TypeOrmModule } from '../typeorm/typeorm.module';
import { EditionDomainService } from './domain/services/edition.service';
import { CreateEditionHandler } from './domain/handlers/create-edition.handler';
import { EditionRepository } from './infrastructure/database/repositories/edition.repository';
import { FindAllEditionHandler } from './domain/handlers/find-all-edition.handler';
import { UpdateEditionHandler } from './domain/handlers/update-edition.handler';
import { DeleteEditionHandler } from './domain/handlers/delete-edition.handler';
import { EditionController } from './application/api/controllers/edition.controller';
import { EditionService } from './application/api/services/edition.service';
import { FindOneEditionHandler } from './domain/handlers/find-one-edition.handler';

@Module({
  controllers: [EditionController],
  imports: [
    TypeOrmModule.forFeature([EditionRepository]),
  ],
  providers: [
    EditionDomainService,
    EditionService,
    UpdateEditionHandler,
    CreateEditionHandler,
    FindAllEditionHandler,
    DeleteEditionHandler,
    FindOneEditionHandler,
  ],
  exports: [
    EditionService,
    TypeOrmModule.forFeature([EditionRepository])
  ],
})
export class EditionModule { }
