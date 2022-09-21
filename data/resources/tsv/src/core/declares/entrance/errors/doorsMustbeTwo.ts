import { ErrorCodeEnum } from '../../errors';
import { DoorType, EntranceType } from '../types';

function getEntranceDoors(doors: DoorType[] | DoorType) {
  if (doors instanceof Array) {
    return doors.length;
  } else {
    return 1;
  }
}

class DoorsMustBeTwoError extends Error {
  constructor(entrance: EntranceType) {
    super(`A double door cannot have (${getEntranceDoors(entrance.doors)})`, {
      cause: { code: ErrorCodeEnum.DoorsMustBeTwoError },
    });
    this.name = 'DoorsMustBeTwoError';
  }
}

export { DoorsMustBeTwoError };
