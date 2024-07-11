import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from './hashing.service';

describe('HashingService', () => {
  let service: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HashingService,
          useFactory: () => ({
            hash: jest.fn(),
            compare: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<HashingService>(HashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
