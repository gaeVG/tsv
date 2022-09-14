import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { IUser } from '../../../core/declares/user';
import { Character } from '../../../core/declares/user';
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

function playerConnecting(
  _: string,
  user: IUser,
  isNewPlayer: boolean,
  characters: Character[],
): void {
  selectCharacter(user, isNewPlayer, characters);
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

export { playerConnecting, playerHostingSession, playerStartingSession };
