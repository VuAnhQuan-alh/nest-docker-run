import { Test, TestingModule } from '@nestjs/testing';
import { UniController } from './uni.controller';
import { UniService } from './uni.service';

describe('UniController', () => {
  let controller: UniController;
  let service: UniService;

  // const unisSerMock = jest.mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniController],
      providers: [
        UniService,
        // { provide: UniService, useValue: unisSerMock },
      ],
    }).compile();

    controller = module.get<UniController>(UniController);
    service = module.get<UniService>(UniService);
  });

  it('should be defined ctrl', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined serv', () => {
    expect(service).toBeDefined();
  });

  describe('controller of unis', () => {
    it('should return new an array of unis', () => {
      expect(controller.createdUnis(2)).toEqual([1, 2, 2]);
    });

    it('should return an array of unis', () => {
      expect(controller.findAllUnis()).toEqual([1, 2]);
    });
  });
});
