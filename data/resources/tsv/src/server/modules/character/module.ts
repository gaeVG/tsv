import { IModule } from '../../../core/declares/module';
import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { characterEvents } from './events';
import { characterThreads } from './threads';
import moduleConfig from './config';
import { tsv } from '../../../server';

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
