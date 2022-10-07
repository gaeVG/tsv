// Declarations
import { IEventListener } from '@declares/events';
import { IStatus } from '@declares/status';
// Core
import { tsv } from '@tsv';

// Status module events descriptions
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
