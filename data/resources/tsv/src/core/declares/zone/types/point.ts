import { Color } from '../../../libs/utils/Color';
import { Vector3 } from '../../../libs/utils/Vector3';
import { User } from '../../../libs/user';

type PointZoneType = {
  name: string;
  module: string;
  color: {
    outline: Color;
    wall: Color;
  };
  point: Vector3;
  radius: boolean;

  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;
};

export { PointZoneType };
