// Declarations
import { NUIListener } from '@declares/nui';
// Module
import { useItem } from './functions';
import config from './config';

// Inventory module NUI descriptions
const inventoryNui: NUIListener[] = [
  {
    name: 'dropCurrentDrag',
    module: 'inventory',
    handler: (data) => {
      console.log(data);

      return true;
    },
  },
  {
    name: 'useItem',
    module: config.moduleName,
    handler: useItem,
  },
];

export { inventoryNui };
