// Declarations
import { NUIListener } from '@declares/nui';
// Module
import { useItem } from './functions';
import moduleConfig from './config';

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
    module: moduleConfig.name,
    handler: useItem,
  },
];

export { inventoryNui };
