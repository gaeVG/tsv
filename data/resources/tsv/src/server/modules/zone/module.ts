// Declarations
import { EnumLogContainer, LogData } from '@declares/log';
import { IModule } from '@declares/module';
// Module
import { zoneThreads } from './threads';
import moduleConfig from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

// Zone module description
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
