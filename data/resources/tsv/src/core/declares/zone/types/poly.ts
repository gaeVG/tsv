// Native wrapper
import { Color, Vector3 } from '@native/utils';
// Declarations
import { IBucket } from '@declares/bucket';
import { IUser } from '@declares/user';

type PolyZoneType = {
  name?: string;
  module?: string;
  polygon: Vector3[];
  height?: number;
  min?: Vector3;
  max?: Vector3;
  center?: Vector3;
  area?: number;
  useGrid?: boolean;
  lazyGrid?: boolean;
  gridArea?: number;
  gridCellWidth?: number;
  gridCellHeight?: number;
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

export { PolyZoneType };
