import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { IModule } from '../../../core/declares/module';
import { zoneThreads } from './threads';
import moduleConfig from './config';
import { tsp } from '../..';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

const ZoneModule: IModule = {
  name: 'zone',
  init(): Error {
    log.location = 'init()';

    try {
      zoneThreads.map((thread) => tsv.threads.createThread(thread));
    } catch (error) {
      return error;
    } finally {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.initComplete', { moduleName: 'zone' }),
      });
    }
  },
};

export { ZoneModule };
