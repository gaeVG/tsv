import { Vector3 } from '../../../libs';

interface ISeat {
  type: string;
  name: string;
  label: string;
  coords: Vector3;
  rotation: Vector3;
}

export { ISeat };
