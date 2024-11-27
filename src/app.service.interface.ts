export abstract class IAppService {
  abstract getBrazilStates(): Promise<any>;
  abstract clearCache(): Promise<void>;
  abstract hasCache(): Promise<boolean>;
}
