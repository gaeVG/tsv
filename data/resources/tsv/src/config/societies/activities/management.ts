import { ActivityEnum } from '../../../core/declares/activity';

const management = {
  name: ActivityEnum.MANAGEMENT,
  roles: [
    {
      name: 'human-resources',
      payAmount: 1500,
    },
    {
      name: 'human-resources-chief',
      payAmount: 2000,
    },
    {
      name: 'assistant-ceo',
      payAmount: 2500,
    },
    {
      name: 'ceo',
      payAmount: 4000,
    },
  ],
};

export { management };
