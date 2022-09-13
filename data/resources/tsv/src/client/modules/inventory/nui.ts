import { useItem } from './functions';
import moduleConfig from './config';
import { NUIListener } from '../../../core/declares/nui';

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
