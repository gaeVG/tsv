// Native wrapper
import { Vector3 } from '@native/utils/Vector3';
// Declarations
import { SocietyEnum, SocietyType } from '@declares/society';
// Activities config
import { driver as driverActivity } from './activities/driver';

// Downtown Cab society description
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
