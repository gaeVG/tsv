import { Vector3 } from '../../../libs/utils/Vector3';
import { Color } from '../../../libs/utils/Color';
import { IBucket } from '../../bucket';
import { User } from '../../../libs/user';

type PolyZoneType = {
  name: string;
  module: string;
  polygon: Vector3[];
  min?: Vector3;
  max?: Vector3;
  center?: Vector3;
  area: number;
  useGrid?: boolean;
  lazyGrid?: boolean;
  gridArea?: number;
  gridCellWidth?: number;
  gridCellHeight?: number;
  gridDivisions: number;
  debugColors?: boolean;
  debugPoly: boolean;
  debugGrid: boolean;
  color?: {
    outline: Color;
    wall: Color;
  };
  bucket: IBucket;

  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;
};

export { PolyZoneType };
