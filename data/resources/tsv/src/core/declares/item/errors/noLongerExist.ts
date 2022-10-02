import { ErrorCodeEnum } from '../../errors';
import { IItem } from '../interface';

class ItemShouldNoLongerExistError extends Error {
  constructor(item: IItem) {
    super(`Item ${item.name} should no longer exist`, {
      cause: { code: ErrorCodeEnum.ItemShouldNoLongerExistError },
    });
    this.name = 'ItemShouldNoLongerExistError';
  }
}

export { ItemShouldNoLongerExistError };
