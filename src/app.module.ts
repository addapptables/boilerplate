import { Module } from '@nestjs/common';
import { MicroserviceModule, ManagerAdapterBus, LocalBusAdapter } from '@addapptables/microservice';
import { ApplicationModule } from './application/api/module';
import { BoilerplateModule } from '@craftsjs/core';
@Module({
  imports: [
    ApplicationModule,
    MicroserviceModule.withConfig({
      adapter: ManagerAdapterBus.getInstance(LocalBusAdapter).build(),
    }),
    BoilerplateModule.forRoot({
      jwt: {
        secret: 'secret',
      },
      typeOrm: {
        type: process.env.DB_TYPE as any,
        url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
          __dirname + '/../lib/**/*.entity{.ts,.js}',
        ],
      },
    }),
  ],
})
export class AppModule { }
