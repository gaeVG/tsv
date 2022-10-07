// Declarations
import { InventoryContainerType } from '@declares/inventory';

type InventoryFromType = {
  owner: number | 'player' | 'shopSection';
  container: InventoryContainerType;
};

export { InventoryFromType };
