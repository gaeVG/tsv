// Native wrapper
import { Player } from '@native/models';
import { Fading } from '@native/ui';
// Declarations
import { LogData, EnumLogContainer } from '@declares/log';
import { UserCharacter, IUser } from '@declares/user';
import { ClientEventNativeEnum } from '@declares/events';
import { IBucket } from '@declares/bucket';
// Module
import { selectCharacter, spawnCharacter } from '../character';
import moduleConfig from './config';
// Core
import { tsv } from '@tsv';
import { User } from '@libs/user';

// Log variable
const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Event,
  isModuleDisplay: moduleConfig.debug,
};

/**
 * Function behind the 'onResourceStart' event, creating the thread to check if the player is active
 * @param {string} resourceName - Name of the resource that has just started
 */
function onResourceStart(_: any, name: string): void {
  log.location = ClientEventNativeEnum.onResourceStart;

  tsv.log.debug({
    ...log,
    message: `Resource ${name} started`,
  });

  if (global.GetCurrentResourceName() === name) {
    tsv.threads.createThread({
      name: 'is-network-player-active',
      timer: 500,
      callback: isNetworkPlayerActiveTick,
    });
  }
}
/**
 * Function behind the `CEventNetworkHostSession` event, directly triggering a server event
 */
function playerHostingSession(): void {
  log.location = ClientEventNativeEnum.CEventNetworkHostSession;
  const player = new Player();

  tsv.log.debug({
    ...log,
    message: tsv.locale('module.player.events.hostSession.askingHost', {
      userId: player.ServerId,
    }),
  });
  // TODO : Créer un module de gestion du hosting
  // TODO : Vérifier si, lorsque iel joueur.euse qui host la partie quitte la session, l'évènement est de nouveau déclenché pour iel.s joueur.euse.s qui reste.nt
  tsv.events.trigger({
    name: ClientEventNativeEnum.CEventNetworkHostSession,
    module: moduleConfig.name,
    onNet: true,
  });
}
/**
 * Function behind the `CEventNetworkStartSession` event, directly triggering a server event
 */
function playerStartingSession(): void {
  log.location = ClientEventNativeEnum.CEventNetworkStartSession;
  const player = new Player();
  tsv.log.safemode({
    ...log,
    message: tsv.locale('module.player.events.startSession.askingStart', {
      userId: player.ServerId,
    }),
  });
  Fading.fadeOut(500);
}
/**
 * Trigger the connection of the player to the server, and if in this case, the selection and spawn of a character
 */
async function playerConnecting(): Promise<void> {
  try {
    // Retrieves player information from the database. Create new entries if necessary.
    const [user, isNewPlayer, userCharacters] = await (tsv.events.trigger({
      name: 'onPlayerJoined',
      module: 'player',
      onNet: true,
      isCallback: true,
    }) as Promise<[IUser, boolean, UserCharacter[]]>);

    // Put the player in a custom bucket during character selection / creation
    const bucket = await (tsv.events.trigger({
      name: 'setNewCharacterIntoBucket',
      module: 'character',
      onNet: true,
      isCallback: true,
      data: [user],
    }) as Promise<IBucket | Error>);
    if (bucket instanceof Error) {
      throw bucket;
    }

    // If the player is new, we send him to the character creation screen
    const userCharacter = await selectCharacter(user, isNewPlayer, userCharacters);
    if (userCharacter instanceof Error) {
      throw userCharacter;
    }

    // Send the character data to the server
    const updatedUser = await (tsv.events.trigger({
      name: 'setCharacter',
      module: 'character',
      onNet: true,
      isCallback: true,
      data: [user, userCharacter],
    }) as Promise<IUser | Error>);
    if (updatedUser instanceof Error) {
      throw updatedUser;
    }

    // Spawn the character
    const error = spawnCharacter(updatedUser);
    if (error instanceof Error) {
      throw error;
    }

    // Notify the server that the player is ready
    const playerSpawned = await (tsv.events.trigger({
      name: 'onPlayerSpawn',
      module: 'player',
      onNet: true,
      isCallback: true,
      data: [user],
    }) as Promise<IUser | Error>);
    if (playerSpawned instanceof Error) {
      throw updatedUser;
    }
  } catch (error) {
    if (error instanceof Error) {
      tsv.log.error({
        ...log,
        message: error.message,
      });
    }
  }
}
/**
 * Tick function to check if the player is active and connect him to the server if it is the case
 * @returns {boolean} Return false to stop the thread
 */
function isNetworkPlayerActiveTick(): boolean {
  try {
    const playerId = PlayerId();
    if (global.NetworkIsPlayerActive(playerId)) {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.player.events.startSession.clientActive', {
          userId: playerId,
        }),
      });

      playerConnecting();
      return false;
    }

    // Player is not active, we wait 1 second before checking again
    return true;
  } catch (error) {
    if (error instanceof Error) {
      tsv.log.error({
        ...log,
        message: error.message,
      });
    }

    return false;
  }
}

export { onResourceStart, playerHostingSession, playerStartingSession };
