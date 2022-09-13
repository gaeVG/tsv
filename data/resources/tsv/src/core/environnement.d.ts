export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly EXECUTION_MODE: 'development' | 'production' | 'test' | 'safemode';
      readonly IDENTIFIER_TYPE: 'steam' | 'fivem';
      readonly SECRET_KEY: string;
    }
  }
}
