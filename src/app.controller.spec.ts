import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { IAppService } from './app.service.interface';

const proto = AppController.prototype;

describe(AppController.name, () => {
  let service: IAppService;
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: IAppService,
          useValue: (service = {} as IAppService),
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe(proto.getHello.name, () => {
    it('should return "Hello World!"', () => {
      // Arrange

      // Act
      const result = appController.getHello();

      // Assert
      expect(result).toBe('Hello World!');
    });
  });

  describe(proto.hasCache.name, () => {
    let hasCache: jest.SpyInstance;

    beforeEach(() => (hasCache = service.hasCache = jest.fn()));

    it('should return "Cache encontrado" when cache exists', async () => {
      // Arrange
      hasCache.mockResolvedValue(true);

      // Act
      const result = await appController.hasCache();

      // Assert
      expect(result).toEqual({ message: 'Cache encontrado' });
      expect(hasCache).toHaveBeenCalledExactlyOnceWith();
    });

    it('should return "Cache encontrado" when cache exists', async () => {
      // Arrange
      hasCache.mockResolvedValue(false);

      // Act
      const result = await appController.hasCache();

      // Assert
      expect(result).toEqual({ message: 'Cache não encontrado' });
      expect(hasCache).toHaveBeenCalledExactlyOnceWith();
    });
  });
});
