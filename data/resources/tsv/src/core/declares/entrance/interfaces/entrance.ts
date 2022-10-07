// Native wrapper
import { Prop } from '@native/models/prop';
// Declarations
import { IUser } from '@declares/user';
import { EntranceStateStype, DoorType } from '@declares/entrance';

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
