import { IModule } from '../../../core/declares/module';
import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { activityEvents } from './events';
import moduleConfig from './config';
import { tsp } from '../../../client';

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
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init', { moduleName: moduleConfig.name }),
      });

      activityEvents.map((event) => tsv.events.listen(event));
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
