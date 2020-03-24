import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { AuthService } from '../../../../lib/@craftsjs/auth';
import { Broker } from '@addapptables/microservice';
import { createMockBrokerService } from '../../../mock/broker.mock';
import { JwtModule } from '@nestjs/jwt';
import { SessionService } from '../../../../lib/@craftsjs/auth/services/session.service';
import { SecurityModule } from '../../../../lib/@craftsjs/security';
import * as uuid from 'uuid/v4';

describe('AuthService', () => {
  let service: AuthService;
  let testingModule: TestingModule;

  before(async () => {
    const broker = createMockBrokerService({ data: { username: 'admin', password: '46f94c8de14fb36680850768ff1b7f2a' } });
    testingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({ secret: 'test' }),
        SecurityModule,
      ],
      providers: [
        AuthService,
        SessionService,
        Broker,
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

  describe('Validate user function', () => {
    it('should return authenticated user', async () => {
      const user = await service.validateUser('admin', '123qwe');
      expect(user).to.be.not.undefined;
    });

    it('should return an error', async () => {
      try {
        await service.validateUser('admin', '456asd');
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
    });
  });

  describe('Login function', () => {
    it('should return access_token', async () => {
      const accessToken = await service.login({ id: uuid(), userName: 'admin', tenantId: 1 } as any);
      expect(accessToken).to.be.not.undefined;
    });
  });

});
