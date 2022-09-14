import { IEventListener } from '../../../core/declares/events';
import { EnumLogContainer, LogData } from '../../../core/declares/log';

import { setCharacter, setNewCharacterIntoBucket } from './functions';
import moduleConfig from './config';
import { tsv } from '../../';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Event,
  isModuleDisplay: moduleConfig.debug,
};

const characterEvents: IEventListener[] = [
  {
    name: 'setCharacter',
    module: 'character',
    onNet: true,
    handler: setCharacter,
    isCallback: true,
  },
  {
    name: 'setNewCharacterBucket',
    module: 'character',
    onNet: true,
    isCallback: true,
    handler: setNewCharacterIntoBucket,
  },
];

export { characterEvents };
