// Declarations
import { ActivityEnum } from '@declares/activity';

// Taxi transporter activity description
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
