import { Module, DynamicModule, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantModule } from '../tenants';
import { EntitySubscriber } from './subscriber/entity.subscriber';
import { BoilerplateOptions } from './interfaces/boilerplate-options.interface';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { SessionMiddleware } from './middleware/session.middleware';

@Module({
  imports: [
    UserModule,
    TenantModule,
  ],
  exports: [
    UserModule,
    TenantModule,
  ],
  providers: [
    EntitySubscriber,
  ],
})
export class BoilerplateModule implements NestModule {

  static forRoot(options: BoilerplateOptions): DynamicModule {
    return {
      module: BoilerplateModule,
      imports: [
        AuthModule.forRoot(options.jwt),
        TypeOrmModule.forRoot(options.typeOrm),
      ],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes('*');
  }
}
