import { Controller, Get, Inject } from '@nestjs/common';
import { IAppService } from './app.service.interface';

@Controller()
export class AppController {
  constructor(
    @Inject('IAppService') private readonly appService: IAppService
  ) {}

  @Get('states')
  async getBrazilStates() {
    return await this.appService.getBrazilStates();
  }

  @Get('clear-cache')
  async clearCache() {
    if (!await this.appService.hasCache()) 
      return { message: 'Cache já esta vazio' };

    await this.appService.clearCache();
    return { message: 'Cache limpo' };
  }

  @Get('has-cache')
  async hasCache() {
    return { message: await this.appService.hasCache() ? 'Cache encontrado' : 'Cache não encontrado' };
  }

}