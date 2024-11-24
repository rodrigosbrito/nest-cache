// test/unit/app.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from 'src/app.service';
import { CacheKeys } from 'src/constants/cache-keys';
import { ApiUrls } from 'src/constants/api-urls';
import axios from 'axios';
import { RequiredCacheManager } from 'src/constants';

jest.mock('axios');

describe('AppService', () => {
  let service: AppService;
  let cacheManager: RequiredCacheManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: RequiredCacheManager,
          useValue: (cacheManager = {
            get: jest.fn(),
            set: jest.fn(),
            reset: jest.fn(),
            store: {
              ttl: jest.fn(),
            },
          } as any),
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBrazilStates', () => {
    it('should return cached states if available', async () => {
      // Arrange
      const cachedStates = [{ nome: 'São Paulo' }];
      jest.spyOn(cacheManager, 'get').mockResolvedValue(cachedStates);
      jest.spyOn(cacheManager.store, 'ttl').mockResolvedValue(120000);

      // Act
      const result = await service.getBrazilStates();

      // Assert
      expect(result).toEqual(cachedStates);
      expect(cacheManager.get).toHaveBeenCalledWith(CacheKeys.BRAZIL_STATES);
    });

    it('should fetch states from API if not cached', async () => {
      // Arrange
      const apiResponse = { data: [{ nome: 'São Paulo' }] };
      (axios.get as jest.Mock).mockResolvedValue(apiResponse);
      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      jest.spyOn(cacheManager, 'set').mockResolvedValue(undefined as never);
      jest.spyOn(cacheManager.store, 'ttl').mockResolvedValue(120000);

      // Act
      const result = await service.getBrazilStates();

      // Assert
      expect(result).toEqual(apiResponse.data);
      expect(axios.get).toHaveBeenCalledWith(ApiUrls.BRAZIL_STATES);
      expect(cacheManager.set).toHaveBeenCalledWith(
        CacheKeys.BRAZIL_STATES,
        apiResponse.data,
      );
    });
  });

  describe('clearCache', () => {
    it('should clear the cache', async () => {
      // Arrange
      jest.spyOn(cacheManager, 'reset').mockResolvedValue(undefined as never);

      // Act
      await service.clearCache();

      // Assert
      expect(cacheManager.reset).toHaveBeenCalled();
    });
  });

  describe('hasCache', () => {
    it('should return true if cache exists', async () => {
      // Arrange
      jest
        .spyOn(cacheManager, 'get')
        .mockResolvedValue([{ nome: 'São Paulo' }]);

      // Act
      const result = await service.hasCache();

      // Assert
      expect(result).toBe(true);
      expect(cacheManager.get).toHaveBeenCalledWith(CacheKeys.BRAZIL_STATES);
    });

    it('should return false if cache does not exist', async () => {
      // Arrange
      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);

      // Act
      const result = await service.hasCache();

      // Assert
      expect(result).toBe(false);
      expect(cacheManager.get).toHaveBeenCalledWith(CacheKeys.BRAZIL_STATES);
    });
  });
});
