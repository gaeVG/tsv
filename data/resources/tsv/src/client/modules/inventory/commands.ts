// Declarations
import { CommandType } from '@declares/command';
// Module
import { openInventory } from './functions';
import config from './config';

// Inventory module commands descriptions
const inventoryCommands = [
  {
    name: 'openInventory',
    module: config.moduleName,
    description: 'module.inventory.commands.openInventory.description',
    handler: openInventory,
    keyMapper: 'keyboard',
    key: 'i',
  },
] as CommandType[];

export { inventoryCommands };
