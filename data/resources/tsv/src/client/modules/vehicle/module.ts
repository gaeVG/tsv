import { IModule } from '../../../core/declares/module';
import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { tsp } from '../../../client';
import { vehicleEvents } from './events';
import moduleConfig from './config';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

const VehicleModule: IModule = {
  name: moduleConfig.name,
  init(): Error {
    log.location = 'init()';

    try {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init', { moduleName: moduleConfig.name }),
      });

      vehicleEvents.map((event) => tsv.events.listen(event));
    } catch (error) {
      return error;
    } finally {
      global.DisplayRadar(false);

      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.complete', { moduleName: moduleConfig.name }),
      });
    }
  },
};

export { VehicleModule };
