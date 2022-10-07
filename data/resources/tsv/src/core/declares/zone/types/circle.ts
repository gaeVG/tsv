// Declarations
import { Color, Vector3 } from '@native/utils';
// Declarations
import { IUser } from '@declares/user';

type CircleZoneType = {
  name: string;
  module: string;
  center: Vector3;
  size?: number;
  limitHeight?: boolean;
  debug: boolean;
  color?: {
    outline: Color;
    wall: Color;
  };

  onEnter?: (user: IUser) => void;
  onLeave?: (user: IUser) => void;
};

export { CircleZoneType };
