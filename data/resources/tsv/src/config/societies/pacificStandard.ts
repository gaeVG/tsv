import { Vector3 } from '../../core/libs/utils/Vector3';
import { Crypto } from '../../core/libs/utils/Crypto';
import { SocietyEnum, SocietyType } from '../../core/declares/society';
import { banker as bankerActivity } from './activities';

const pacificStandard = {
  id: Crypto.uuidv4(),
  name: SocietyEnum.PACIFIC_STANDARD,
  building: [
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
  ],
  activities: [
    {
      ...bankerActivity,
      isMain: true,
    },
  ],
} as SocietyType;

export { pacificStandard };
