// Declarations
import { IModule } from '@declares/module';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import { inventoryCommands } from './commands';
import { inventoryNui } from './nui';
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: config.debug,
};

// Inventory module description
const InventoryModule: IModule = {
  name: config.moduleName,
  init(): Error {
    log.location = tsv.locale('module.global.init.location', { moduleName: config.moduleName });

    try {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.start', { moduleName: config.moduleName }),
      });

      inventoryCommands.forEach((command) => tsv.commands.register(command));
      inventoryNui.forEach((nui) => tsv.nui.listen(nui));
    } catch (error) {
      return error;
    } finally {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.complete', { moduleName: config.moduleName }),
      });
    }
  },
};

export { InventoryModule };
