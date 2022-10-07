// Declarations
import { EnumLogContainer, LogData } from '@declares/log';
import { IModule } from '@declares/module';
// Module
import { statusThreads } from './threads';
import { statusEvent } from './events';
import config from './config';
// Core
import { tsv } from '../../';

// Log variable
const log: LogData = {
  namespace: `Module${config.name.charAt(0).toUpperCase() + config.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: config.debug,
};

// Status module description
const StatusModule: IModule = {
  name: config.name,
  init(): Error {
    log.location = tsv.locale('module.global.init', { moduleName: config.name });
    try {
      statusEvent.map((event) => tsv.events.listen(event));
      statusThreads.map((thread) => tsv.threads.createThread(thread));
    } catch (error) {
      return error;
    } finally {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.initComplete', { moduleName: config.name }),
      });
    }
  },
};

export { StatusModule };
