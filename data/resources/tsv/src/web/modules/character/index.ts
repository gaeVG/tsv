// DEPENDENCIES
import { NUIModule } from '../../../core/declares/nui';
// IMPORTS
import { characterRender } from './render';

export default {
  name: 'character',
  activate: true,
  render: characterRender,
} as NUIModule;
