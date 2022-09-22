import { ErrorCodeEnum } from '../../errors';
import { IEntrance, EntranceStateEnum } from '..';

class EntranceToogleStateError extends Error {
  constructor(entrance: IEntrance) {
    super(`The door cannot be ${entrance.state === EntranceStateEnum.CLOSE ? 'unlock' : 'lock'}`, {
      cause: { code: ErrorCodeEnum.EntranceToggleStateError },
    });
    this.name = 'DoorsMustBeTwoError';
  }
}

export { EntranceToogleStateError };
