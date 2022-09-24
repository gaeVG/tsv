import { ThreadModule } from '../../../core/declares/threads';
import { isNetworkPlayerActiveTick } from './functions';

const playerThreads: ThreadModule[] = [
  {
    name: 'is-network-player-active',
    timer: 500,
    callback: isNetworkPlayerActiveTick,
  },
];

export { playerThreads };
