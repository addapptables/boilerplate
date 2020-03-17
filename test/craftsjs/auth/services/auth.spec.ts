import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { AppModule } from '../../../../src/app.module';
import { AuthService } from '../../../../lib/@craftsjs/auth';
import { User } from '../../../../lib/@craftsjs/user/infrastructure/database/entities/user.entity';
import { LoggerMock } from '../../../mock/logger.mock';
import { Broker } from '@addapptables/microservice';
import { createMockBrokerService } from '../../../mock/broker.mock';

describe('AuthService', () => {
  let service: AuthService;
  let testingModule: TestingModule;

  before(async () => {
    const broker = createMockBrokerService({ data: { username: 'admin', password: '46f94c8de14fb36680850768ff1b7f2a' } });
    testingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
      providers: [
        { provide: 'CraftsLogger', useClass: LoggerMock },
      ],
    })
      .overrideProvider(Broker)
      .useValue(broker)
      .compile();
    await testingModule.init();
    service = testingModule.get<AuthService>(AuthService);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(service).to.be.not.undefined;
  });

  describe('Validate function', () => {
    it('should get user', async () => {
      const user = await service.validateUser('admin', '123qwe');
      expect(user).to.be.not.undefined;
    });

    it('should get an error', async () => {
      try {
        await service.validateUser('admin', '456asd');
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
    });
  });

  describe('Login function', () => {
    it('should return access_token', async () => {
      const user = await service.login({ id: 1, userName: 'admin', tenantId: 1 } as User);
      expect(user).to.be.not.undefined;
    });
  });

});
