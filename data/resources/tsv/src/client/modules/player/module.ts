import { IModule } from '../../../core/declares/module';
import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { playerEvents } from './events';
import { playerThreads } from './threads';
import { playerCommands } from './commands';
import { playerMenus } from './menus';
import { tsp } from '../..';
import moduleConfig from './config';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

const PlayerModule: IModule = {
  name: moduleConfig.name,
  init(): Error {
    log.location = tsv.locale('module.global.init.location');

    try {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.start', { moduleName: moduleConfig.name }),
      });

      playerEvents.map((event) => tsv.events.listen(event));
      playerThreads.map((thread) => tsv.threads.createThread(thread));
      playerCommands.map((command) => tsv.commands.register(command));
      playerMenus.map((menu) => tsv.menus.createMenu(menu));
    } catch (error) {
      return error;
    } finally {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.complete', { moduleName: moduleConfig.name }),
      });
    }
  },
};

export { PlayerModule };
