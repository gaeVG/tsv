import { ThreadModule } from '../../../core/declares/threads';
import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { tsv } from '../..';
import moduleConfig from './config';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Thread,
  isModuleDisplay: moduleConfig.debug,
};

const playerThreads: ThreadModule[] = [
  {
    name: 'is-network-player-active',
    timer: 500,
    callback() {
      const playerId = PlayerId();
      if (NetworkIsPlayerActive(playerId)) {
        tsv.log.safemode({
          ...log,
          message: tsv.locale('module.player.events.startSession.clientActive', {
            userId: playerId,
          }),
        });
        tsv.events.trigger({ name: 'onPlayerJoined', module: 'player', onNet: true });
        return false;
      }
      return true;
    },
  },
];

export { playerThreads };
