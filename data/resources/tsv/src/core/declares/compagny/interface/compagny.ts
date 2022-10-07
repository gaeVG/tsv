// Native wrapper
import { Vector3 } from '@native/utils/Vector3';

interface ICompagny {
  [name: string]: {
    building: Vector3[];
    activities: [];
  };
}

export { ICompagny };
