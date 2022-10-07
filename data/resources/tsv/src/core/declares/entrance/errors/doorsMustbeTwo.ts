// Declarations
import { ErrorCodeEnum } from '@declares/errors';
import { DoorType, EntranceType } from '@declares/entrance';

/**
 * Get the number of doors of the entrance
 * @param doors
 * @returns {number} The number of doors
 */
function getTotalNumberEntranceDoor(doors: DoorType[] | DoorType): number {
  if (doors instanceof Array) {
    return doors.length;
  } else {
    return 1;
  }
}

class DoorsMustBeTwoError extends Error {
  constructor(entrance: EntranceType) {
    super(`A double door cannot have (${getTotalNumberEntranceDoor(entrance.doors)})`, {
      cause: { code: ErrorCodeEnum.DoorsMustBeTwoError },
    });
    this.name = 'DoorsMustBeTwoError';
  }
}

export { DoorsMustBeTwoError };
