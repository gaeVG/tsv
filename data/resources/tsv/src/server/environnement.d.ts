export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly EXECUTION_MODE: 'development' | 'production' | 'test' | 'safemode';
      readonly IDENTIFIER_TYPE: 'steam' | 'fivem';
      readonly DEBUG_MODULES: string;
      readonly DB_HOST: string;
      readonly DB_PORT: string;
      readonly DB_NAME: string;
      readonly DB_USER: string;
      readonly DB_PASSWORD: string;
      readonly DISCORD_TOKEN: string;
    }
  }
}
