import { IModule } from '../../../core/declares/module';
import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { zoneEvents } from './events';
import moduleConfig from './config';
import { tsp } from '../..';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

const CharacterModule: IModule = {
  name: moduleConfig.name,
  init(): Error {
    log.location = tsv.locale('module.global.init.location');

    try {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.init.start', { moduleName: moduleConfig.name }),
      });

      zoneEvents.map((event) => tsv.events.listen(event));
    } catch (error) {
      return error;
    } finally {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.init.complete', { moduleName: moduleConfig.name }),
        isLast: true,
      });
    }
  },
};

export { CharacterModule };
