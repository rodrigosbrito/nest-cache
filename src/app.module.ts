import { Module } from '@nestjs/common';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import store from 'cache-manager-redis-store';
import { RedisConfig } from './constants/redis-config';
import { IAppService } from './app.service.interface';
import { RequiredCacheManager } from './constants';
import ms from 'ms';
import { SECONDS_MS } from './utils';

@Module({
  imports: [
    CacheModule.register({
      store: store as unknown as string,
      host: RedisConfig.SERVER_URL,
      port: RedisConfig.SERVER_PORT,
      ttl: ms('2m') / SECONDS_MS,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: IAppService,
      useClass: AppService,
    },
    {
      provide: RequiredCacheManager,
      useFactory: (x) => x,
      inject: [CACHE_MANAGER],
    },
  ],
})
export class AppModule {}
