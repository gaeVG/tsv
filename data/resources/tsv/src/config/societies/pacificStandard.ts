// Native wrapper
import { Vector3 } from '@native/utils/Vector3';
import { Crypto } from '@native/utils/Crypto';
// Declarations
import { SocietyEnum, SocietyType } from '@declares/society';
// Activities config
import { banker as bankerActivity } from './activities';

// Pacific Standard society description
const pacificStandard = {
  id: Crypto.uuidv4(),
  name: SocietyEnum.PACIFIC_STANDARD,
  building: {
    zone: {
      name: SocietyEnum.PACIFIC_STANDARD,
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
      ...bankerActivity,
      isMain: true,
    },
  ],
} as SocietyType;

export { pacificStandard };
