// Declarations
import { DoorType, EntranceStateEnum } from '@declares/entrance';

type EntranceStateStype = EntranceStateEnum.CLOSE | EntranceStateEnum.OPEN;

type EntranceType = {
  doors: DoorType | DoorType[];
  distanceMax?: number;
  isRemote?: boolean;
  isGate?: boolean;
  state: EntranceStateStype;
};

export { EntranceType, EntranceStateStype };
