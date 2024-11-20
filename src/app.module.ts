import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from 'cache-manager-redis-store';
import { RedisConfig } from './constants/redis-config';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: RedisConfig.SERVER_URL,
      port: RedisConfig.SERVER_PORT,
      ttl: 120000, // 2 minutos em segundos
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [{provide: 'IAppService', useClass: AppService}],
})
export class AppModule {}
