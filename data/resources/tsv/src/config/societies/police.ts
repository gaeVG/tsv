import { Vector3 } from '../../core/libs/utils/Vector3';
import { Vector4 } from '../../core/libs/utils/Vector4';
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
        new Vector3(390.82, -941.63, 29.42),
        new Vector3(506.73, -943.37, 26.99),
        new Vector3(508.29, -1022.76, 28.12),
        new Vector3(386.33, -1037.27, 29.27),
      ],
      entrances: [
        {
          doors: [
            {
              hash: -1547307588,
              coords: new Vector4(434.7444, -983.0781, 30.8153, 90.017),
            },
            {
              hash: -1547307588,
              coords: new Vector4(434.7444, -980.7556, 30.8153, 269.912),
            },
          ],
        },
        {
          doors: {
            hash: -1603817716,
            coords: new Vector4(488.8948, -1017.21, 27.1458, 90),
          },
          isGate: true,
        },
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
