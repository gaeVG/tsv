import { ItemType } from '../../item';
import { InventoryContainerType } from './container';

type InventoryType = {
  container: InventoryContainerType;
  items: ItemType[];
};

export { InventoryType };
