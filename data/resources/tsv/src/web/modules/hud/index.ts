import { NUIModule } from '@declares/nui';
import { Hud } from './render';

export default {
  name: 'head-up-display',
  activate: true,
  render: Hud,
} as NUIModule;
