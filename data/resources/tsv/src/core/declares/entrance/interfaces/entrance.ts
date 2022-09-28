import { Prop } from '../../../libs/models/prop';
import { EntranceStateStype, DoorType } from '..';
import { IUser } from '../../user';

interface IEntrance {
  id: string;
  doors?: DoorType | DoorType[];
  target?: Prop | Prop[];
  distanceMax?: number;
  isRemote?: boolean;
  state?: EntranceStateStype;

  lock?(user: IUser): Promise<EntranceStateStype>;
  unlock?(user: IUser): Promise<EntranceStateStype>;
}

export { IEntrance };
