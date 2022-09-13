import { Vector3 } from '../../core/libs/utils/Vector3';
import { CompagnyEnum, SocietyEnum, SocietyType } from '../../core/declares/society';
import {
  ems as emsActivity,
  mechanic as mechanicActivity,
  security as securityActivity,
} from './activities';

const ems = {
  name: CompagnyEnum.EMS,
  owner: CompagnyEnum.EMS,
  building: [
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
  ],
  isCompagny: true,
  societies: [
    {
      name: SocietyEnum.PILLBOX,
      building: [
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
      ],
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
