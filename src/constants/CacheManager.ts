import { Cache } from '@nestjs/cache-manager';

export class RequiredCacheManager implements Cache {}
export interface RequiredCacheManager extends Cache {
  store: Required<Cache['store']>;
}
