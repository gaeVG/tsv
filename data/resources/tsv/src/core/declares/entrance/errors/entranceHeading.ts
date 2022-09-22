import { ErrorCodeEnum } from '../../errors';

class EntranceHeadingError extends Error {
  constructor() {
    super(`The door is not properly closed`, {
      cause: { code: ErrorCodeEnum.EntranceHeadingError },
    });
    this.name = 'EntranceHeadingError';
  }
}

export { EntranceHeadingError };
