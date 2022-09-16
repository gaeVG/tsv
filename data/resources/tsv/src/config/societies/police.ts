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
        new Vector3(390.62, -1029.29, 28.26),
        new Vector3(394.31, -945.08, 26.38),
        new Vector3(501.26, -947.86, 28.69),
        new Vector3(500.56, -1023.67, 32.71),
        new Vector3(387.12, -1042.82, 32.69),
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
