import { ErrorCodeEnum } from '../../errors';
import { IItem } from '../interface';

class UnknownItemError extends Error {
  constructor(item: IItem) {
    super(`Unknown item: ${item}`, {
      cause: { code: ErrorCodeEnum.UnknownItemError },
    });
    this.name = 'UnknownItemError';
  }
}

export { UnknownItemError };
