import { TypeOrmModuleOptions } from '@craftsjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';

export interface BoilerplateOptions {
  jwt: JwtModuleOptions;
  typeOrm: TypeOrmModuleOptions;
}
