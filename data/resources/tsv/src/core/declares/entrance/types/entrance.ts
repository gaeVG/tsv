import { DoorType } from '.';

type EntranceType = {
  doors: DoorType | DoorType[];
  distanceMax?: number;
  isRemote?: boolean;
};

export { EntranceType };
