import { NUIModule } from '../../../core/declares/nui';
import { Hud } from './render';

export default {
  name: 'head-up-display',
  activate: true,
  render: Hud,
} as NUIModule;
