// Declarations
import { ErrorCodeEnum } from '@declares/errors';
import { IEntrance, EntranceStateEnum } from '@declares/entrance';

class EntranceToogleStateError extends Error {
  constructor(entrance: IEntrance) {
    super(`The door cannot be ${entrance.state === EntranceStateEnum.CLOSE ? 'unlock' : 'lock'}`, {
      cause: { code: ErrorCodeEnum.EntranceToggleStateError },
    });
    this.name = 'DoorsMustBeTwoError';
  }
}

export { EntranceToogleStateError };
