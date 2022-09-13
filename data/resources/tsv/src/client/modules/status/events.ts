import { IEventListener } from '../../../core/declares/events';
import { IStatus } from '../../../core/declares/status';
import { tsp } from '../../';

const statusEvents: IEventListener[] = [
  {
    name: 'playerStatusUpdate',
    module: 'status',
    onNet: true,
    handler: (_, status: IStatus[]): void => {
      tsv.nui.trigger({
        module: 'head-up-display',
        name: 'update-player-status',
        payload: { status },
      });
    },
  },
];

export { statusEvents };
