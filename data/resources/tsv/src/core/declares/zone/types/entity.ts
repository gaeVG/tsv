import { Entity } from '../../../libs/models/Entity';
import { Color } from '../../../libs/utils/Color';
import { User } from '../../../libs/user';

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

  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;
};

export { EntityZoneType };
