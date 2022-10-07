// Native wrapper
import { Vector3, Color } from '@native/utils';
// Declarations
import { IUser } from '@declares/user';
import { IBucket } from '@declares/bucket';

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

  onEnter?: (user: IUser) => void;
  onLeave?: (user: IUser) => void;
};

export { ZoneType };
