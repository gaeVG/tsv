// Declarations
import { NUIModule } from '@declares/nui';
// Module
import { characterRender } from './render';

export default {
  name: 'character',
  activate: true,
  render: characterRender,
} as NUIModule;
