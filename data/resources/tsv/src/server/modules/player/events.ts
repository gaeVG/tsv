// Declarations
import {
  ClientEventNativeEnum,
  IEventListener,
  ServerEventNativeEnum,
  SharedEventNativeEnum,
} from '@declares/events';
import {
  playerHosting,
  onPlayerJoined,
  playerConnecting,
  playerDropped,
  onPlayerSpawn,
} from './functions';

// Module events description
const playerEvents: IEventListener[] = [
  {
    // onPlayerConnecting event : native event when player connect to server!
    name: ServerEventNativeEnum.playerConnecting,
    module: 'player',
    handler: playerConnecting,
  },
  {
    // playerDropped : native event when player disconnect from server
    name: SharedEventNativeEnum.playerDropped,
    module: 'player',
    handler: playerDropped,
  },
  {
    // onPlayerHosting event : native event from client
    name: ClientEventNativeEnum.CEventNetworkHostSession,
    module: 'player',
    onNet: true,
    handler: playerHosting,
  },
  {
    // onPlayerJoined event : event triggered from client
    name: 'onPlayerJoined',
    module: 'player',
    onNet: true,
    isCallback: true,
    handler: onPlayerJoined,
  },
  {
    name: 'onPlayerSpawn',
    module: 'player',
    onNet: true,
    isCallback: true,
    handler: onPlayerSpawn,
  },
];

export { playerEvents };
