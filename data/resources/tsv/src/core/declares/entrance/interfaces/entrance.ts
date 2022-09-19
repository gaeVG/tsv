import { Prop } from '../../../libs/models/prop';
import { EntranceStateStype } from '..';

interface IEntrance {
  id: string;
  target: Prop | Prop[];
  distanceMax?: number;
  isRemote?: boolean;
  state: EntranceStateStype;

  lock(): void;
  unlock(): void;
}

export { IEntrance };
