import { IEventListener } from '../../../core/declares/events';
import { getInventory, getAllInventories, getItemCount, useItem } from './functions';
import moduleConfig from './config';

const inventoryEvents: IEventListener[] = [
  {
    name: 'getInventory',
    module: moduleConfig.name,
    onNet: true,
    isCallback: true,
    handler: getInventory,
  },
  {
    name: 'getItemCount',
    module: moduleConfig.name,
    onNet: true,
    isCallback: true,
    handler: getItemCount,
  },
  {
    name: 'getAllInventories',
    module: moduleConfig.name,
    onNet: true,
    isCallback: true,
    handler: getAllInventories,
  },
  {
    name: 'useItem',
    module: moduleConfig.name,
    onNet: true,
    isCallback: true,
    handler: useItem,
  },
];

export { inventoryEvents };
