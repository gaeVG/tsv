import { Vector3 } from '../../core/libs/utils/Vector3';
import { CompagnyEnum, SocietyEnum, SocietyType } from '../../core/declares/society';
import { security as securityActivity, ems as emsActivity } from './activities';

const police = {
  name: CompagnyEnum.POLICE,
  owner: CompagnyEnum.POLICE,
  building: [
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
  ],
  isCompagny: true,
  societies: [
    {
      name: SocietyEnum.MISSION_ROW,
      building: [
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
      ],
      activities: [
        {
          ...securityActivity,
          isMain: true,
        },
        emsActivity,
      ],
    },
  ],
} as SocietyType;

export { police };
