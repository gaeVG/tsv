export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly EXECUTION_MODE: 'development' | 'production' | 'test' | 'safemode';
    }
  }
}
