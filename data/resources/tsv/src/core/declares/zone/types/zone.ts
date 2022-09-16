import { Vector3, Color } from '../../../libs';
import { User } from '../../../libs/user';
import { IBucket } from '../../bucket';
import { Entity } from '../../../libs';

type ZoneType = {
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
type PolyZoneType = {
  name: string;
  module: string;
  polygon: Vector3[];
  min?: Vector3;
  max?: Vector3;
  center?: Vector3;
  size?: Vector3;
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
type EntityZoneType = {
  name: string;
  module: string;
  entity: Entity;
  size?: Vector3;
  debugColors?: boolean;
  debug: boolean;
  color?: {
    outline: Color;
    wall: Color;
  };

  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;
};
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

export { ZoneType, PolyZoneType, EntityZoneType, PointZoneType };
