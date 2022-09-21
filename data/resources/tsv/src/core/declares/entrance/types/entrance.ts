import { DoorType } from '.';
import { EntranceStateEnum } from '../enums';

type EntranceStateStype = EntranceStateEnum.CLOSE | EntranceStateEnum.OPEN;

type EntranceType = {
  doors: DoorType | DoorType[];
  distanceMax?: number;
  isRemote?: boolean;
  isGate?: boolean;
  state: EntranceStateStype;
};

export { EntranceType, EntranceStateStype };
