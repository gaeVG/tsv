import { NUIModule } from '@declares/nui';
import { inventoryRender } from './render';

export default {
  name: 'inventory',
  activate: true,
  render: inventoryRender,
} as NUIModule;
