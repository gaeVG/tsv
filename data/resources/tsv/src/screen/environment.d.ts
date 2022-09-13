export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly EXECUTION_MODE: 'development' | 'production' | 'test' | 'safemode';
      readonly SECRET_KEY: string;
      readonly PUBLIC_URL: string;
      readonly ASSET_PATH: string;
    }
  }
}
