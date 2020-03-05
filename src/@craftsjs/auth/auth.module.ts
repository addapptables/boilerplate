import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
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
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    SessionSerializer,
    AuthenticatedGuard,
    LoginGuard,
    SessionService,
  ],
  exports: [
    AuthService,
    AuthenticatedGuard,
    LoginGuard,
    SessionService,
  ],
})
export class AuthModule {

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
}
