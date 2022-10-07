// Declarations
import { ActivityEnum } from '@declares/activity';

// Banker activity description
const banker = {
  name: ActivityEnum.BANKER,
  roles: [
    {
      name: 'buyer',
      payAmount: 700,
    },
    {
      name: 'accountants-assitant',
      payAmount: 900,
    },
    {
      name: 'collection-officer',
      payAmount: 1200,
    },
    {
      name: 'accounts-receivable',
      payAmount: 1500,
    },
    {
      name: 'accountant-treasurer',
      payAmount: 1900,
    },
    {
      name: 'management-controller',
      payAmount: 2500,
    },
  ],
};

export { banker };
