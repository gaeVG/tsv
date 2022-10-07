// Declarations
import { IModule } from '@declares/module';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import moduleConfig from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

// Character module description
const CharacterModule: IModule = {
  name: moduleConfig.name,
  init(): Error {
    log.location = 'init()';

    try {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.init', { moduleName: moduleConfig.name }),
      });
    } catch (error) {
      return error;
    } finally {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.init.complete', { moduleName: moduleConfig.name }),
        isLast: true,
      });
    }
  },
};

export { CharacterModule };
