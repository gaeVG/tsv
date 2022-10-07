// Native wrapper
import { Vector3 } from '@native/utils';

interface ISeat {
  type: string;
  name: string;
  label: string;
  coords: Vector3;
  rotation: Vector3;
}

export { ISeat };
