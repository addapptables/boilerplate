import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '../../../../../lib/@craftsjs/typeorm';
import { Photo } from './photo/photo.entity';
import { PhotoModule } from './photo/photo.module';
import { DisposableOptionModule } from '../../../../../lib/@craftsjs/core/disposable/disposable-option.module';
import { SessionModule } from '../../../../../lib/@craftsjs/auth/session/session.module';

class ConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: process.env.DB_TYPE as any,
      url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
      synchronize: Boolean(process.env.DB_SYNCRONIZE),
      entities: [Photo],
      retryAttempts: 2,
      retryDelay: 1000,
    };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: ConfigService,
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
    PhotoModule,
    DisposableOptionModule,
    SessionModule
  ],
})
export class AsyncOptionsClassModule { }
