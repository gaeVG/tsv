// Declarations
import { IModule } from '@declares/module';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import { activityEvents } from './events';
import moduleConfig from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

// Activity module description
const ActivityModule: IModule = {
  name: moduleConfig.name,
  init(): Error {
    log.location = 'init()';

    try {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init', { moduleName: moduleConfig.name }),
      });

      activityEvents.forEach((event) => tsv.events.listen(event));
    } catch (error) {
      return error;
    } finally {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.complete', { moduleName: moduleConfig.name }),
        isLast: true,
      });
    }
  },
};

export { ActivityModule };
