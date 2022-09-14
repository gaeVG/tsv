import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { IModule } from '../../../core/declares/module';
import { statusThreads } from './threads';
import { statusEvent } from './events';
import moduleConfig from './config';
import { tsv } from '../../';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

const StatusModule: IModule = {
  name: moduleConfig.name,
  init(): Error {
    log.location = tsv.locale('module.global.init', { moduleName: moduleConfig.name });
    try {
      statusEvent.map((event) => tsv.events.listen(event));
      statusThreads.map((thread) => tsv.threads.createThread(thread));
    } catch (error) {
      return error;
    } finally {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.initComplete', { moduleName: moduleConfig.name }),
      });
    }
  },
};

export { StatusModule };
