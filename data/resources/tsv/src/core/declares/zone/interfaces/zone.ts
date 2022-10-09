// Native wrapper
import { Color, Vector3 } from '@native/utils';
// Declarations
import { IBucket } from '@declares/bucket';
import { IUser } from '@declares/user';

interface IZone {
  id: string;
  name?: string;
  module?: string;
  points?: Vector3[] | Vector3;
  min?: Vector3;
  max?: Vector3;
  center?: Vector3;
  size?: number;
  useGrid?: boolean;
  lazyGrid?: boolean;
  gridDivisions?: number;
  debugPoly?: boolean;
  debugGrid?: boolean;
  color?: {
    outline: Color;
    wall: Color;
  };
  bucket?: IBucket;
  users?: IUser[];

  onEnter?: (user: IUser) => void;
  onLeave?: (user: IUser) => void;
}

export { IZone };
