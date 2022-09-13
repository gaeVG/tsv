import { NUIModule } from '../../../core/declares/nui';
import { inventoryRender } from './render';

export default {
  name: 'inventory',
  activate: true,
  render: inventoryRender,
} as NUIModule;
