// Native wrapper
import { Color, Vector3 } from '@native/utils';
// Declarations
import { IUser } from '@declares/user';

type PointZoneType = {
  name: string;
  module: string;
  color: {
    outline: Color;
    wall: Color;
  };
  point: Vector3;
  radius: boolean;

  onEnter?: (user: IUser) => void;
  onLeave?: (user: IUser) => void;
};

export { PointZoneType };
