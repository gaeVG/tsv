// Declarations
import { IEventListener } from '@declares/events';

// Status module events descriptions
const statusEvent: IEventListener[] = [
  {
    name: 'statusUpdate',
    module: 'status',
    onNet: true,
    isCallback: true,
    handler: () => {
      // TODO: Complete the status update event
    },
  },
];

export { statusEvent };
