import { IModule } from '../../../core/declares/module';
import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { inventoryEvents } from './events';
import moduleConfig from './config';
import { tsp } from '../..';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Event,
  isModuleDisplay: moduleConfig.debug,
};

const InventoryModule: IModule = {
  name: moduleConfig.name,
  init(): Error {
    log.location = tsv.locale('global.location.init');

    try {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.start', {
          moduleName: moduleConfig.name,
        }),
      });
      log.isChild = true;

      inventoryEvents.map((event) => tsv.events.listen(event));
    } catch (error) {
      return error;
    } finally {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.initComplete', {
          moduleName: moduleConfig.name,
        }),
        isLast: true,
      });
    }
  },
};

export { InventoryModule };
