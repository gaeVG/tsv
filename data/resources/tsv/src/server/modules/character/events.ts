import { IEventListener } from '../../../core/declares/events';
import { setCharacter, setNewCharacterIntoBucket } from './functions';

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
