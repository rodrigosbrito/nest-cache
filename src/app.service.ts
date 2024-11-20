import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { convertMillisecondsToMinutes } from './utils/time.utils';
import { sortByName } from './utils/collection.utils';
import { CacheKeys } from './constants/cache-keys';
import { ApiUrls } from './constants/api-urls';
import { IAppService } from './app.service.interface';

@Injectable()
export class AppService implements IAppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  
  async getBrazilStates() {
    const cacheKey = CacheKeys.BRAZIL_STATES;
    const cachedStates = await this.cacheManager.get(cacheKey);

    if (cachedStates) {
      const ttl = await this.cacheManager.store.ttl(cacheKey);
      console.log(`Dados retornados do Cache - ${convertMillisecondsToMinutes(ttl)} minutos restantes.`);
      return cachedStates;
    }

    const states = await this.fetchBrazilStatesFromApi();
    await this.cacheManager.set(cacheKey, states);
    const ttl = await this.cacheManager.store.ttl(cacheKey);
    console.log(`Dados retornados da API - ${convertMillisecondsToMinutes(ttl)} minutos restantes.`);	
    return states;
  }

  async clearCache() {
    await this.cacheManager.reset();
  }

  async hasCache() {
    return await this.cacheManager.get(CacheKeys.BRAZIL_STATES) ? true : false;
  }

  private async fetchBrazilStatesFromApi() {
    const response = await axios.get(ApiUrls.BRAZIL_STATES);
    return sortByName(response.data);
  }
}
