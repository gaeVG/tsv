import { IItem } from '../interface';

class UnknownItemError extends Error {
  constructor(item: IItem) {
    super(`Unknown item: ${item}`);
    this.name = 'UnknownItemError';
  }
}

export { UnknownItemError };
