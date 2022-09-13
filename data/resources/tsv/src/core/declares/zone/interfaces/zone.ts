import { Color, Entity, Vector3 } from '../../../libs';
import { User } from '../../../libs/user';
import { IBucket } from '../../bucket';
import { IUser } from '../../user';

interface IZone {
  id: string;
  name: string;
  module: string;
  color: {
    outline: Color;
    wall: Color;
  };
  min: Vector3;
  max: Vector3;
  points: Vector3[] | Vector3 | Entity;
  radius?: boolean;
  bucket?: IBucket;
  users?: IUser[];

  onEnter?: (user: User) => void;
  onLeave?: (user: User) => void;
}

export { IZone };
