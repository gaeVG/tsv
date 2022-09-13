import { ActivityEnum, DriverActivityMissionEnum } from '../../../core/declares/activity';

const driver = {
  name: ActivityEnum.DRIVER,
  roles: [
    {
      name: 'independent',
      payAmount: 300,
    },
    {
      name: 'employee',
      payAmount: 700,
    },
    {
      name: 'private',
      payAmount: 1500,
    },
  ],
  missions: [
    {
      name: DriverActivityMissionEnum.PED_RIDE,
      maxDistance: 500,
      minDistance: 15,
      dices: {
        foundPed: '4d8',
        standPed: '20d12',
      },
    },
  ],
  production: 'transport',
};

export { driver };
