// Declarations
import { EnumLogContainer, LogData } from '@declares/log';
import { IModule } from '@declares/module';
// Module
import { loadingActivities } from './functions';
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: config.debug,
};

const ActivityModule: IModule = {
  name: config.moduleName,
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
          moduleName: config.moduleName,
        }),
        isLast: true,
      });
    }
  },
};

export { ActivityModule };
