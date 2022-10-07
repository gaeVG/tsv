// Declarations
import { IModule } from '@declares/module';
import { EnumLogContainer, LogData } from '@declares/log';
// Module
import { characterEvents } from './events';
import { characterThreads } from './threads';
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: config.debug,
};

// Character module description
const CharacterModule: IModule = {
  name: config.moduleName,
  init(): Error {
    log.location = tsv.locale('module.global.init.location');

    try {
      tsv.log.safemode({ ...log, message: tsv.locale('module.global.init.start') });
      log.isChild = true;

      characterEvents.map((event) => tsv.events.listen(event));
      characterThreads.map((thread) => tsv.threads.createThread(thread));
    } catch (error) {
      return error;
    } finally {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.global.init.complete'),
        isLast: true,
      });
    }
  },
};

export { CharacterModule };
