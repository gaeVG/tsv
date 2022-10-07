// Declarations
import { IModule } from '@declares/module';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: config.debug,
};

// Character module description
const CharacterModule: IModule = {
  name: config.moduleName,
  init(): Error {
    log.location = 'init()';

    try {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.init', { moduleName: config.moduleName }),
      });
    } catch (error) {
      return error;
    } finally {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.init.complete', { moduleName: config.moduleName }),
        isLast: true,
      });
    }
  },
};

export { CharacterModule };
