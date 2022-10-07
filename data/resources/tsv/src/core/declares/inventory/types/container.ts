// Declarations
import { InventoryContainerEnum } from '@declares/inventory';

type InventoryContainerType =
  | InventoryContainerEnum.BAG
  | InventoryContainerEnum.CLOTHE
  | InventoryContainerEnum.GLOVE
  | InventoryContainerEnum.KEYBOX
  | InventoryContainerEnum.POCKET
  | InventoryContainerEnum.SAFELOCK
  | InventoryContainerEnum.STORE
  | InventoryContainerEnum.TRASH
  | InventoryContainerEnum.TRUNK
  | InventoryContainerEnum.WEAPON;

export { InventoryContainerType };
