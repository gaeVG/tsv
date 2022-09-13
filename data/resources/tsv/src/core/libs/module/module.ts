import { IModule } from '../../declares/module';

class Module implements IModule {
  name: string;
  onStart: boolean;
  running?: boolean;
  init: () => Error;

  constructor(module: IModule) {
    this.name = module.name;
    this.init = module.init;
  }
}

export { Module };
