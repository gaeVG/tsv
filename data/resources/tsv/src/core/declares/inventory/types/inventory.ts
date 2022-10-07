// Declarations
import { ItemType } from '@declares/item';
import { InventoryContainerType } from '@declares/inventory';

type InventoryType = {
  container: InventoryContainerType;
  items: ItemType[];
};

export { InventoryType };
