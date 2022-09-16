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
        new Vector3(390.82, -941.63, 28.42),
        new Vector3(506.73, -943.37, 25.99),
        new Vector3(508.29, -1022.76, 27.12),
        new Vector3(386.33, -1037.27, 28.27),
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
