import { IItem, ItemType } from '../../item';
import { InventoryContainerType } from '..';

interface IInventory {
  container: InventoryContainerType;
  items: IItem[];

  addItem(item: ItemType): boolean;
  getItem(item: ItemType): IItem;
  updateItem(item: IItem): IItem | Error;
}

export { IInventory };
