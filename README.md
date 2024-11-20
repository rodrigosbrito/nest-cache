## Descrição

Este projeto NestJS em TypeScript busca a lista de estados do Brasil na API dos Correios e armazena em cache do Redis.

## Instalação

Para instalar as dependências do projeto, execute:

```bash
npm install
```

## Uso

Para iniciar o servidor, execute:

```bash
npm run start
```

## Principais Códigos

### Configuração do Cache

```typescript
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
```

### Buscando os estados na API dos correios

```typescript
export const ApiUrls = {
    BRAZIL_STATES: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  };
```

```typescript
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

  private async fetchBrazilStatesFromApi() {
    const response = await axios.get(ApiUrls.BRAZIL_STATES);
    return sortByName(response.data);
  }
```

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Para isso, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feature/nova-feature`).
5. Crie um novo Pull Request.
