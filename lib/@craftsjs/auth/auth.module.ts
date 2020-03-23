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
import { AuthenticatedGuard } from './guard/authentication.guard';
import { LoginGuard } from './guard/login.guard';
import { AuthController } from './application/controllers/auth.controller';
import { SessionService } from './services/session.service';
import { SecurityModule } from '@craftsjs/security';
import { UserModule } from '@craftsjs/user/user.module';
import { PermissionGuard } from './guard/permission.guard';
import { SessionMiddleware } from './middleware/session.middleware';
import { TenantModule } from '../tenant/tenant.module';

@Global()
@Module({
  controllers: [
    AuthController,
  ],
  imports: [
    PassportModule.register({
      session: true,
      defaultStrategy: 'jwt',
    }),
    SecurityModule,
    UserModule,
    MicroserviceModule,
    TenantModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    SessionSerializer,
    AuthenticatedGuard,
    LoginGuard,
    SessionService,
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
  exports: [
    AuthService,
    AuthenticatedGuard,
    LoginGuard,
    SessionService,
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
