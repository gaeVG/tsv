// Declarations
import { ActivityEnum } from '@declares/activity';

// Mechanic activity description
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
