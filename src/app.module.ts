import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IAppService } from './app.service.interface';

@Module({
  imports: [CacheModule.register({ ttl: 120000, isGlobal: true })], // 2 minutes in milliseconds
  controllers: [AppController],
  providers: [{provide: 'IAppService', useClass: AppService}],
})
export class AppModule {}
