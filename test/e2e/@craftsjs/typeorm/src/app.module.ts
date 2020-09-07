import { Module } from '@nestjs/common';
import { TypeOrmModule } from '../../../../../lib/@craftsjs/typeorm/typeorm.module';
import { Photo } from './photo/photo.entity';
import { PhotoModule } from './photo/photo.module';
import { DisposableOptionModule } from '../../../../../lib/@craftsjs/core/disposable/disposable-option.module';
import { SessionModule } from '../../../../../lib/@craftsjs/auth/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
      synchronize: Boolean(process.env.DB_SYNCRONIZE),
      entities: [Photo],
      autoLoadEntities: false,
      retryAttempts: 2,
      retryDelay: 1000,
    }),
    PhotoModule,
    TypeOrmModule.forRoot({
      name: 'connection_2',
      type: process.env.DB_TYPE as any,
      url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
      synchronize: Boolean(process.env.DB_SYNCRONIZE),
      entities: [Photo],
      autoLoadEntities: false,
      retryAttempts: 2,
      retryDelay: 1000,
    }),
    SessionModule,
    DisposableOptionModule
  ],
})
export class ApplicationModule {}
