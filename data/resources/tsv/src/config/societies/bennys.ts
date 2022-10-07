// Native wrapper
import { Vector3 } from '@native/utils/Vector3';
// Declarations
import { SocietyEnum, SocietyType } from '../../core/declares/society';
// Activities config
import { mechanic } from './activities';

// Bennys society description
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
