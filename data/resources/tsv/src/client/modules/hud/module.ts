// Declarations
import { IModule } from '@declares/module';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import { hudEvents } from './events';
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Module,
};

// HUD module description
const HudModule: IModule = {
  name: config.moduleName,
  init(): Error {
    log.location = 'init()';

    try {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.init.start', { moduleName: config.moduleName }),
      });

      hudEvents.map((event) => tsv.events.listen(event));
    } catch (error) {
      return error;
    } finally {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.init.complete', { moduleName: config.moduleName }),
        isLast: true,
      });
    }
  },
};

export { HudModule };
