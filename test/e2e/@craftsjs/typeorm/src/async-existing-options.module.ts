import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
} from '../../../../../lib/@craftsjs/typeorm/typeorm.module';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '../../../../../lib/@craftsjs/typeorm/interfaces';
import { Photo } from './photo/photo.entity';
import { PhotoModule } from './photo/photo.module';
import { DisposableOptionModule } from '../../../../../lib/@craftsjs/core/disposable/disposable-option.module';
import { SessionModule } from '../../../../../lib/@craftsjs/auth/session/session.module';
import { FullAuditedTest } from './photo/full-audited.entity';

class ConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      dropSchema: true,
      entities: [Photo, FullAuditedTest],
      retryAttempts: 2,
      retryDelay: 1000,
    };
  }
}

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
class ConfigModule { }

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    TypeOrmModule.forRoot({
      name: 'connection_2',
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      dropSchema: true,
      entities: [Photo, FullAuditedTest],
      autoLoadEntities: false,
      retryAttempts: 2,
      retryDelay: 1000,
    }),
    PhotoModule,
    DisposableOptionModule,
    SessionModule
  ],
})
export class AsyncOptionsExistingModule { }
