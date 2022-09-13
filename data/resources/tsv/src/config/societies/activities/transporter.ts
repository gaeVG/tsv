import { ActivityEnum } from '../../../core/declares/activity';

const taxi = {
  name: ActivityEnum.DRIVER,
  roles: [
    {
      name: 'independent',
      payAmount: 300,
    },
    {
      name: 'driver',
      payAmount: 700,
    },
    {
      name: 'private',
      payAmount: 1500,
    },
  ],
};

export { taxi };
