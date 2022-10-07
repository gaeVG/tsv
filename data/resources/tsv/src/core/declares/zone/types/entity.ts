// Native wrapper
import { Entity } from '@native/models/Entity';
import { Color } from '@native/utils/Color';
// Declarations
import { IUser } from '@declares/user';

type EntityZoneType = {
  name: string;
  module: string;
  entity: Entity;
  size?: number;
  debugColors?: boolean;
  debug: boolean;
  color?: {
    outline: Color;
    wall: Color;
  };

  onEnter?: (user: IUser) => void;
  onLeave?: (user: IUser) => void;
};

export { EntityZoneType };
