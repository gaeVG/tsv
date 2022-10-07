// Declarations
import { IModule } from '@declares/module';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import { entranceEvents } from './events';
import moduleConfig from './config';
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
    log.location = tsv.locale('module.global.init.location');

    try {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.start', { moduleName: moduleConfig.name }),
      });

      entranceEvents.forEach((event) => tsv.events.listen(event));
    } catch (error) {
      return error;
    } finally {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.complete', { moduleName: moduleConfig.name }),
      });
    }
  },
};

export { EntranceModule };
