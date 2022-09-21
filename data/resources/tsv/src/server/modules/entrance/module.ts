// DECLARES
import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { IModule } from '../../../core/declares/module';
// CONFIG
import moduleConfig from './config';
// EVENTS
import { entranceEvents } from './events';
// CORE
import { tsv } from '../..';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

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
