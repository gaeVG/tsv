// Declarations
import { IEventListener } from '@declares/events';
// Module
import { setCharacter, setNewCharacterIntoBucket } from './functions';

// Character module events description
const characterEvents: IEventListener[] = [
  {
    name: 'setCharacter',
    module: 'character',
    onNet: true,
    handler: setCharacter,
    isCallback: true,
  },
  {
    name: 'setNewCharacterIntoBucket',
    module: 'character',
    onNet: true,
    isCallback: true,
    handler: setNewCharacterIntoBucket,
  },
];

export { characterEvents };
