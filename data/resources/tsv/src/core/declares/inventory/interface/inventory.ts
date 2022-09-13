import { IItem, ItemType } from '../../item';
import { InventoryContainerType } from '..';

interface IInventory {
  container: InventoryContainerType;
  items: IItem[];

  addItem(item: ItemType): boolean;
  updateItem(item: IItem): IItem | Error;
}

export { IInventory };
