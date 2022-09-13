import { Vector3 } from '../../../libs';

interface ICompagny {
  [name: string]: {
    building: Vector3[];
    activities: [];
  };
}

export { ICompagny };
