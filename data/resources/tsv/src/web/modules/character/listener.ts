// Declarations
import { NUIListener } from '@declares/nui';

// Character module events listener
const characterListeners: NUIListener[] = [
  {
    name: 'select-character',
    module: 'character',
    handler: (event: Event) => {
      console.log(event.target);
      console.log(event.composed);
    },
  },
];

export { characterListeners };
