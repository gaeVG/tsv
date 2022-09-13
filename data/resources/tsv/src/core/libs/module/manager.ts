import { Log } from '../log';
import { IModule, ModuleAlreadyExistError } from '../../declares/module';
import { Module } from './module';
import { EnumLogContainer, LogData } from '../../declares/log';
import _t from '../../../config/i18n';

const log: LogData = {
  namespace: 'CoreModule',
  container: EnumLogContainer.Manager,
};

class ModuleManager {
  private manager: IModule[];

  constructor() {
    log.location = 'constructor()';
    Log.debug({
      ...log,
      message: _t('core.module.manager.constructor.creating'),
    });
    this.manager = [];
    Log.debug({
      ...log,
      message: _t('core.module.manager.constructor.complete'),
      isChild: true,
      isLast: true,
    });
  }

  loadModules(modules: IModule[]): void {
    log.location = 'loadModules()';
    Log.debug({
      ...log,
      message: _t('core.module.manager.loadModules.loadingModule', { count: modules.length }),
    });

    modules.map((module) => {
      try {
        if (this.manager.find((m) => m.name === module.name)) {
          throw new ModuleAlreadyExistError(module);
        }

        const moduleInstance = new Module(module);
        const init = moduleInstance.init();

        if (init instanceof Error) {
          throw init;
        }
          
        moduleInstance.running = true;
        this.manager.push(moduleInstance);

        Log.confirm({
          ...log,
          message: _t('core.module.manager.loadModules.loadedModule', { moduleName: module.name }),
          isChild: true,
          isLast: true,
        });
      } catch (error) {
        if (error instanceof Error) {
          Log.error({
            ...log,
            message: _t('core.module.manager.loadModules.error', { errorMessage: error.message }),
          })
        }
      }
    });
  }
}

export { ModuleManager };
