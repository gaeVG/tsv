import { Prop } from '../../../libs/models/prop';

interface IEntrance {
  id: string;
  target: Prop | Prop[];
  distanceMax?: number;
  isRemote?: boolean;

  lock(): void;
  unlock(): void;
}

export { IEntrance };
