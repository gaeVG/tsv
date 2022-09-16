import { Color, Vector3 } from '../../../libs';
import { User } from '../../../libs/user';
import { IBucket } from '../../bucket';
import { IUser } from '../../user';

interface IZone {
  id: string;
  name: string;
  module: string;
  points: Vector3[] | Vector3;
  min?: Vector3;
  max?: Vector3;
  center?: Vector3;
  size?: Vector3;
  useGrid?: boolean;
  lazyGrid?: boolean;
  gridDivisions?: number;
  debugPoly?: boolean;
  debugGrid?: boolean;
  color: {
    outline: Color;
    wall: Color;
  };
  bucket?: IBucket;
  users?: IUser[];

  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;
}

export { IZone };
