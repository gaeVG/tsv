import { IModule } from '../interface';

class ModuleAlreadyExistError extends Error {
  constructor(module: IModule) {
    super(`Module ${module.name} already exists`);
  }
}

export { ModuleAlreadyExistError };
