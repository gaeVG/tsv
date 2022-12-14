import { IItem } from '../../../declares/item';
import { InventoryContainerType } from '../types';

class InventoryItemNotFoundError extends Error {
  constructor(container: InventoryContainerType, item: IItem) {
    super(`Inventory item ${item.name} not found in ${container}`);
    this.name = 'InventoryItemNotFoundError';
  }
}

export { InventoryItemNotFoundError };
