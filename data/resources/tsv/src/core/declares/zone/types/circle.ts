import { Vector3 } from '../../../libs/utils/Vector3';
import { Color } from '../../../libs/utils/Color';
import { User } from '../../../libs/user';

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

  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;
};

export { CircleZoneType };
