import { CommandType } from '../../../core/declares/command';
import { openInventory } from './functions';
import moduleConfig from './config';

const inventoryCommands = [
  {
    name: 'openInventory',
    module: moduleConfig.name,
    description: 'module.inventory.commands.openInventory.description',
    handler: openInventory,
    keyMapper: 'keyboard',
    key: 'i',
  },
] as CommandType[];

export { inventoryCommands };
