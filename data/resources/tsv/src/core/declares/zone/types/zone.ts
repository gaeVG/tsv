import { Vector2, Vector3, Color } from '../../../libs';
import { User } from '../../../libs/user';
import { IBucket } from '../../bucket';

type ZoneType = {
  name: string;
  module?: string;
  points: Vector3[] | Vector3;
  min?: Vector3;
  max?: Vector3;
  center?: Vector3;
  size?: number;
  useGrid?: boolean;
  lazyGrid?: boolean;
  gridDivisions?: number;
  debugColors?: boolean;
  debugPoly?: boolean;
  debugGrid?: boolean;
  color?: {
    outline: Color;
    wall: Color;
  };

  bucket?: IBucket;

  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;
};

export { ZoneType };
