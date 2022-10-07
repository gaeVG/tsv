// Declarations
import { IItem, ItemType } from '@declares/item';
import { InventoryContainerType } from '@declares/inventory';

interface IInventory {
  container: InventoryContainerType;
  items: IItem[];

  addItem(item: ItemType): boolean;
  getItem(item: ItemType): IItem;
  updateItem(item: IItem): IItem | Error;
}

export { IInventory };
