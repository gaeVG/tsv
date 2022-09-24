import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { IUser } from '../../../core/declares/user';
import { UserCharacter } from '../../../core/declares/user';
import { ClientEventNativeEnum } from '../../../core/declares/events';
import { Player, Fading } from '../../../core/libs';
import { selectCharacter } from '../character';
import moduleConfig from './config';
import { tsv } from '../..';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Event,
  isModuleDisplay: moduleConfig.debug,
};

async function playerConnecting(
  _: string,
  user: IUser,
  isNewPlayer: boolean,
  characters: UserCharacter[],
): Promise<void> {
  const characterSelected = await selectCharacter(user, isNewPlayer, characters);

  if (characterSelected instanceof Error) {
    tsv.log.error({
      ...log,
      message: characterSelected.message,
    });

    return;
  }
}
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

async function setUserFromDB(): Promise<void> {
  try {
    const [user, isNewPlayer, userCharacters] = await (tsv.events.trigger({
      name: 'onPlayerJoined',
      module: 'player',
      onNet: true,
      isCallback: true,
    }) as Promise<[IUser, boolean, UserCharacter[]]>);

    const error = selectCharacter(user, isNewPlayer, userCharacters);
    if (error !== undefined) {
      throw error;
    }

    tsv.events.trigger({
      name: 'onPlayerSpawn',
      module: 'player',
      onNet: true,
      data: [user],
    });
  } catch (error) {
    if (error instanceof Error) {
      tsv.log.error({
        ...log,
        message: error.message,
      });
    }
  }
}
function isNetworkPlayerActiveTick(): boolean {
  try {
    const playerId = PlayerId();

    if (NetworkIsPlayerActive(playerId)) {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.player.events.startSession.clientActive', {
          userId: playerId,
        }),
      });

      setUserFromDB();
      return false;
    }

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

export { isNetworkPlayerActiveTick, playerConnecting, playerHostingSession, playerStartingSession };
