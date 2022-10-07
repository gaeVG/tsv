// Declarations
import { NUIModule } from '@declares/nui';
// Log module render
import { Logs } from './render';

// Log module description
export default {
  name: 'logs',
  activate: true,
  render: Logs,
} as NUIModule;
