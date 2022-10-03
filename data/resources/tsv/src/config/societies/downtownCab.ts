import { Vector3 } from '../../core/libs/utils/Vector3';
import { driver as driverActivity } from './activities/driver';
import { SocietyEnum, SocietyType } from '../../core/declares/society';

const downtownCab = {
  name: SocietyEnum.DOWNTOWN_CAB,
  owner: SocietyEnum.DOWNTOWN_CAB,
  building: {
    zone: {
      polygon: [
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
      ],
      height: 20,
    },
    entrances: [],
  },
  activities: [
    {
      ...driverActivity,
      roles: driverActivity.roles.filter((role) => role.name !== 'independent'),
      isMain: true,
    },
  ],
} as SocietyType;

export { downtownCab };
