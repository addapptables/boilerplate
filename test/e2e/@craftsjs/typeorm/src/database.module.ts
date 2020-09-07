import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '../../../../../lib/@craftsjs/typeorm/typeorm.module';
import { Photo } from './photo/photo.entity';
import { DisposableOptionModule } from '../../../../../lib/@craftsjs/core/disposable/disposable-option.module';
import { SessionModule } from '../../../../../lib/@craftsjs/auth/session/session.module';

@Module({})
export class DatabaseModule {
  static async forRoot(): Promise<DynamicModule> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: process.env.DB_TYPE as any,
          url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
          synchronize: Boolean(process.env.DB_SYNCRONIZE),
          entities: [Photo],
          retryAttempts: 2,
          retryDelay: 1000,
        }),
        TypeOrmModule.forRoot({
          name: 'connection_2',
          type: process.env.DB_TYPE as any,
          url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
          synchronize: Boolean(process.env.DB_SYNCRONIZE),
          entities: [Photo],
          retryAttempts: 2,
          retryDelay: 1000,
        }),
        DisposableOptionModule,
        SessionModule
      ],
    };
  }
}
