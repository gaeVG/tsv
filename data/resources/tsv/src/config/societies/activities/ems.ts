import { ActivityEnum } from '../../../core/declares/activity';

const ems = {
  name: ActivityEnum.EMS,
  roles: [
    {
      name: 'assistant',
      payAmount: 500,
    },
    {
      name: 'student',
      payAmount: 700,
    },
    {
      name: 'intern',
      payAmount: 1000,
    },
    {
      name: 'doctor-intern',
      payAmount: 1500,
    },
    {
      name: 'assistant-doctor',
      payAmount: 2000,
    },
    {
      name: 'doctor',
      payAmount: 2500,
    },
    {
      name: 'academic-doctor',
      payAmount: 4000,
    },
  ],
};

export { ems };
