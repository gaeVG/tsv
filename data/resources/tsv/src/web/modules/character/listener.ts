import { NUIListener } from '../../../core/declares/nui';

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
