// Declarations
import { EnumLogContainer, LogData } from '@declares/log';
import { IModule } from '@declares/module';
// Module
import config from './config';
import { loadingActivities } from './functions';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.name.charAt(0).toUpperCase() + config.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: config.debug,
};

const ActivityModule: IModule = {
  name: config.name,
  init(): Error {
    log.location = 'init()';

    try {
      loadingActivities();
    } catch (error) {
      return error;
    } finally {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.init.complete', {
          moduleName: config.name,
        }),
        isLast: true,
      });
    }
  },
};

export { ActivityModule };
