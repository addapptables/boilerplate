import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '../../../../../lib/@craftsjs/typeorm/typeorm.module';
import { Photo } from './photo/photo.entity';
import { DisposableOptionModule } from '../../../../../lib/@craftsjs/core/disposable/disposable-option.module';
import { SessionModule } from '../../../../../lib/@craftsjs/auth/session/session.module';
import { FullAuditedTest } from './photo/full-audited.entity';

@Module({})
export class DatabaseModule {
  static async forRoot(): Promise<DynamicModule> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          dropSchema: true,
          entities: [Photo, FullAuditedTest],
          retryAttempts: 2,
          retryDelay: 1000,
        }),
        TypeOrmModule.forRoot({
          name: 'connection_2',
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          dropSchema: true,
          entities: [Photo, FullAuditedTest],
          retryAttempts: 2,
          retryDelay: 1000,
        }),
        DisposableOptionModule,
        SessionModule
      ],
    };
  }
}
