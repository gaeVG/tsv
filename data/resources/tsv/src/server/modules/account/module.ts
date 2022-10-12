// Declarations
import { IModule } from '@declares/module';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import { accountEvents } from './events';
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Event,
  isModuleDisplay: config.debug,
};

// Module events description
const AccountModule: IModule = {
  name: config.moduleName,
  init(): Error {
    log.location = tsv.locale('global.location.init');

    try {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.start', {
          moduleName: config.moduleName,
        }),
      });
      log.isChild = true;
      console.log('là');
      accountEvents.forEach((event) => tsv.events.listen(event));
    } catch (error) {
      return error;
    } finally {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.initComplete', {
          moduleName: config.moduleName,
        }),
        isLast: true,
      });
    }
  },
};

export { AccountModule };
