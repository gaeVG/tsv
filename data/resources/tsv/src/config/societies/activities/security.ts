import { ActivityEnum } from '../../../core/declares/activity';

const security = {
  name: ActivityEnum.SECURITY,
  roles: [
    {
      name: 'guard',
      payAmount: 400,
    },
    {
      name: 'dog-handler',
      payAmount: 500,
    },
    {
      name: 'money-courier',
      payAmount: 700,
    },
    {
      name: 'officer',
      payAmount: 1000,
    },
    {
      name: 'chief-officer',
      payAmount: 1400,
    },
    {
      name: 'lieutenant',
      payAmount: 1900,
    },
    {
      name: 'commissioner',
      payAmount: 2500,
    },
  ],
};

export { security };
