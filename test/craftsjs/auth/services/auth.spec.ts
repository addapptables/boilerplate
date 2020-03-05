import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../src/app.module';
import { AuthService } from '../../../../src/@craftsjs/auth';
import { expect } from 'chai';

describe('AuthService', () => {
  let service: AuthService;

  before(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
      providers: [],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    // tslint:disable-next-line:no-unused-expression
    expect(service).to.be.not.undefined;
  });
});
