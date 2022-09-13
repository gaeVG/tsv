import { ActivityEnum } from '../../../core/declares/activity';

const mechanic = {
  name: ActivityEnum.MECHANIC,
  roles: [
    {
      name: 'rookie',
      payAmount: 500,
    },
    {
      name: 'non-commissioned',
      payAmount: 700,
    },
    {
      name: 'officer-chief',
      payAmount: 1000,
    },
  ],
};

export { mechanic };
