import { Module, DynamicModule, Provider, Global, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { MicroserviceModule } from '@addapptables/microservice';
import { JWT_SECRET } from '../config';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SessionSerializer } from './services/session-serializer.service';
import { LoginGuard } from './guard/login.guard';
import { AuthController } from './application/controllers/auth.controller';
import { SecurityModule } from '../security';
import { UserModule } from '../user/user.module';
import { PermissionGuard } from './guard/permission.guard';
import { SessionMiddleware } from './middleware/session.middleware';
import { TenantModule } from '../tenant/tenant.module';
import { SessionModule } from './session/session.module';

@Global()
@Module({
  controllers: [
    AuthController,
  ],
  imports: [
    PassportModule.register({
      session: false,
      defaultStrategy: 'jwt',
    }),
    SecurityModule,
    UserModule,
    MicroserviceModule,
    TenantModule,
    SessionModule
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    SessionSerializer,
    LoginGuard,
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    SessionMiddleware,
  ],
  exports: [
    AuthService,
    LoginGuard
  ],
})
export class AuthModule implements NestModule {

  static forRoot(options: JwtModuleOptions): DynamicModule {
    const jwtSecret: Provider = {
      provide: JWT_SECRET,
      useValue: options.secret,
    };
    return {
      module: AuthModule,
      imports: [
        JwtModule.register(options),
      ],
      providers: [
        jwtSecret,
      ],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes('*');
  }
}
