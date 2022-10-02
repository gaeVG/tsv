import { InventoryContainerType } from '..';

type InventoryFromType = {
  owner: number | 'player' | 'shopSection';
  container: InventoryContainerType;
};

export { InventoryFromType };
