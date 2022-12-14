import { IModule } from '../../../core/declares/module';
import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { playerEvents } from './events';
import { playerThreads } from './threads';
import { tsp } from '../../../server';
import moduleConfig from './config';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Event,
  isModuleDisplay: moduleConfig.debug,
};

const PlayerModule: IModule = {
  name: moduleConfig.name,
  init(): Error {
    log.location = tsv.locale('global.location.init');
    try {
      tsv.log.debug({
        ...log,
        message: tsv.locale('global.message.init', { moduleName: moduleConfig.name }),
      });

      playerEvents.map((event) => tsv.events.listen(event));
      playerThreads.map((thread) => tsv.threads.createThread(thread));
    } catch (error) {
      return error;
    } finally {
      tsv.log.debug({
        ...log,
        message: tsv.locale('global.location.initComplete', { moduleName: moduleConfig.name }),
      });
    }
  },
};

export { PlayerModule };
