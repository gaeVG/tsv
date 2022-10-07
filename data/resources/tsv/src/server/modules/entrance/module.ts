// Declarations
import { EnumLogContainer, LogData } from '@declares/log';
import { IModule } from '@declares/module';
// Module
import moduleConfig from './config';
import { entranceEvents } from './events';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

// Entrance module description
const EntranceModule: IModule = {
  name: moduleConfig.name,
  init(): Error {
    log.location = 'init()';

    try {
      entranceEvents.forEach((event) => tsv.events.listen(event));
    } catch (error) {
      return error;
    } finally {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.init.complete', {
          moduleName: moduleConfig.name,
        }),
        isLast: true,
      });
    }
  },
};

export { EntranceModule };
