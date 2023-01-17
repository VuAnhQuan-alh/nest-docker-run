import { Test, TestingModule } from '@nestjs/testing';
import { UniService } from './uni.service';

describe('UniService', () => {
  let service: UniService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniService],
    }).compile();

    service = module.get<UniService>(UniService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
