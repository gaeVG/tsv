// Declarations
import { IModule } from '@declares/module';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import { playerEvents } from './events';
import { playerCommands } from './commands';
import { playerMenus } from './menus';
import moduleConfig from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

// Player module description
const PlayerModule: IModule = {
  name: moduleConfig.name,
  init(): Error {
    log.location = tsv.locale('module.global.init.location');

    try {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.start', { moduleName: moduleConfig.name }),
      });

      playerEvents.forEach((event) => tsv.events.listen(event));
      playerCommands.forEach((command) => tsv.commands.register(command));
      playerMenus.forEach((menu) => tsv.menus.createMenu(menu));
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
