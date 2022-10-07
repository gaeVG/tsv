// Declarations
import { IModule } from '@declares/module';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import { activityEvents } from './events';
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: config.debug,
};

// Activity module description
const ActivityModule: IModule = {
  name: config.moduleName,
  init(): Error {
    log.location = 'init()';

    try {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init', { moduleName: config.moduleName }),
      });

      activityEvents.forEach((event) => tsv.events.listen(event));
    } catch (error) {
      return error;
    } finally {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.complete', { moduleName: config.moduleName }),
        isLast: true,
      });
    }
  },
};

export { ActivityModule };
