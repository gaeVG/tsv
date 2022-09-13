import { Vector3, Color } from '../../../libs';
import { User } from '../../../libs/user';
import { IBucket } from '../../bucket';
import { Entity } from '../../../libs';

type ZoneType = {
  name: string;
  module: string;
  color?: {
    outline: Color;
    wall: Color;
  };
  points: Vector3[] | Vector3 | Entity;
  radius?: boolean;
  bucket?: IBucket;

  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;
};
type PolyZoneType = {
  name: string;
  module: string;
  color: {
    outline: Color;
    wall: Color;
  };
  points: Vector3[];
  bucket: IBucket;

  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;
};
type EntityZoneType = {
  name: string;
  module: string;
  color: {
    outline: Color;
    wall: Color;
  };
  points: Entity;
  radius: boolean;

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
  points: Vector3;
  radius: boolean;

  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;
};

export { ZoneType, PolyZoneType, EntityZoneType, PointZoneType };
