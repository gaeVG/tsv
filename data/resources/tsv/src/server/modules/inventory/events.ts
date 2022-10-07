// Declarations
import { IEventListener } from '@declares/events';
// Module
import {
  getInventory,
  getAllInventories,
  getItemCount,
  canUseItem,
  consumeItem,
} from './functions';
import config from './config';

// Inventory module events descriptions
const inventoryEvents: IEventListener[] = [
  {
    name: 'getInventory',
    module: config.moduleName,
    onNet: true,
    isCallback: true,
    handler: getInventory,
  },
  {
    name: 'getItemCount',
    module: config.moduleName,
    onNet: true,
    isCallback: true,
    handler: getItemCount,
  },
  {
    name: 'getAllInventories',
    module: config.moduleName,
    onNet: true,
    isCallback: true,
    handler: getAllInventories,
  },
  {
    name: 'canUseItem',
    module: config.moduleName,
    onNet: true,
    isCallback: true,
    handler: canUseItem,
  },
  {
    name: 'consumeItem',
    module: config.moduleName,
    onNet: true,
    isCallback: true,
    handler: consumeItem,
  },
];

export { inventoryEvents };
