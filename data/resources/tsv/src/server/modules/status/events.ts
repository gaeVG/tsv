import { IEventListener } from '../../../core/declares/events';

const statusEvent: IEventListener[] = [
  {
    name: 'statusUpdate',
    module: 'status',
    onNet: true,
    isCallback: true,
    handler: () => {
      console.log('statusUpdate');
    },
  },
];

export { statusEvent };
