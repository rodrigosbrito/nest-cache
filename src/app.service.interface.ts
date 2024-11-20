export interface IAppService {
    getBrazilStates(): Promise<any>;
    clearCache(): Promise<void>;
    hasCache(): Promise<boolean>;
}