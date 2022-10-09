// Declarations
import { IModule } from '@declares/module';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import { playerEvents } from './events';
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Event,
  isModuleDisplay: config.debug,
};

// Player module description
const PlayerModule: IModule = {
  name: config.moduleName,
  init(): Error {
    log.location = tsv.locale('global.location.init');
    try {
      tsv.log.debug({
        ...log,
        message: tsv.locale('global.message.init', { moduleName: config.moduleName }),
      });

      playerEvents.forEach((event) => tsv.events.listen(event));
    } catch (error) {
      return error;
    } finally {
      tsv.log.debug({
        ...log,
        message: tsv.locale('global.location.initComplete', { moduleName: config.moduleName }),
      });
    }
  },
};

export { PlayerModule };
