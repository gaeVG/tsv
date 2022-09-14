// DECLARES
import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { IModule } from '../../../core/declares/module';
// CONFIG
import moduleConfig from './config';
// MODULE
import { loadingActivities } from './functions';
// CORE
import { tsv } from '../..';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

const ActivityModule: IModule = {
  name: moduleConfig.name,
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
          moduleName: moduleConfig.name,
        }),
        isLast: true,
      });
    }
  },
};

export { ActivityModule };
