import { InventoryFromType } from '../../inventory';
import { ItemCategoryType, IItem } from '..';

interface IUsableItem {
  name: string;
  label?: string;
  category: ItemCategoryType | undefined;
  count: number;
  metadata?: unknown;
  canUseItem(container: InventoryFromType): Promise<boolean | Error>;
  use(container: InventoryFromType): Promise<IItem | Error>;
  consumeItem(container: InventoryFromType): Promise<IItem | Error>;
}

export { IUsableItem };
