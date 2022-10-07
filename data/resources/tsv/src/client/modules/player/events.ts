// Declarations
import { IEventListener, ClientEventNativeEnum } from '@declares/events';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import { onResourceStart, playerHostingSession, playerStartingSession } from './functions';
import moduleConfig from './config';

// Log variable
const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Event,
  isModuleDisplay: moduleConfig.debug,
};

// Player module events descriptions
const playerEvents: IEventListener[] = [
  {
    // Listen game native events
    name: ClientEventNativeEnum.gameEventTriggered,
    module: moduleConfig.name,
    handler: (_, ...args: unknown[]): void => {
      switch (args[0]) {
        case ClientEventNativeEnum.CEventNetworkHostSession:
          playerHostingSession();
          break;
        case ClientEventNativeEnum.CEventNetworkStartSession:
          playerStartingSession();
          break;
        case ClientEventNativeEnum.CEventPlayerDeath:
          log.location = ClientEventNativeEnum.CEventPlayerDeath;
          // TODO : Créer un module de gestion du décès
          // TODO : Il me semble que les arguments données indique la cause de la mort (par une personne ou un objet)
          break;
      }
    },
  },
  {
    name: ClientEventNativeEnum.onResourceStart,
    module: moduleConfig.name,
    handler: onResourceStart,
  },
];

export { playerEvents };
