import { Vector3 } from '../../core/libs/utils/Vector3';
import { mechanic } from './activities';
import { SocietyEnum, SocietyType } from '../../core/declares/society';

const bennys = {
  name: SocietyEnum.BENNYS,
  owner: SocietyEnum.BENNYS,
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
      ...mechanic,
      isMain: true,
    },
  ],
} as SocietyType;

export { bennys };
