import { InventoryContainerType } from '../../inventory';
import { ItemCategoryType } from '../../item';

interface IUsableItem {
  name: string;
  label?: string;
  category: ItemCategoryType | undefined;
  count: number;
  metadata?: unknown;
  use(...args: Array<unknown>): void;
  getAllowToUse(useItem: (canUseItem: boolean) => void, container: InventoryContainerType): void;
}

export { IUsableItem };
