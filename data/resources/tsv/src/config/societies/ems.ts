// Native wrapper
import { Vector3 } from '@native/utils/Vector3';
// Declarations
import { CompagnyEnum, SocietyEnum, SocietyType } from '@declares/society';
// Activities config
import {
  ems as emsActivity,
  mechanic as mechanicActivity,
  security as securityActivity,
} from './activities';

// EMS compagny description
const ems = {
  name: CompagnyEnum.EMS,
  owner: CompagnyEnum.EMS,
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
  isCompagny: true,
  societies: [
    {
      name: SocietyEnum.PILLBOX,
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
          ...emsActivity,
          isMain: true,
        },
        {
          ...securityActivity,
          roles: securityActivity.roles.filter((role) => role.name === 'guard'),
        },
        mechanicActivity,
      ],
    },
  ],
} as SocietyType;

export { ems };
