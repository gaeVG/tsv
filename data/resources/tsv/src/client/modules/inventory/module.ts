// Declarations
import { IModule } from '@declares/module';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import { inventoryCommands } from './commands';
import { inventoryNui } from './nui';
import moduleConfig from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

// Inventory module description
const InventoryModule: IModule = {
  name: moduleConfig.name,
  init(): Error {
    log.location = tsv.locale('module.global.init.location', { moduleName: moduleConfig.name });

    try {
      tsv.log.debug({
        ...log,
        message: tsv.locale('module.global.init.start', { moduleName: moduleConfig.name }),
      });

      inventoryCommands.forEach((command) => tsv.commands.register(command));
      inventoryNui.forEach((nui) => tsv.nui.listen(nui));
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

export { InventoryModule };
