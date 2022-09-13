import { IItem, ItemType, ItemCategoryType } from '../../declares/item';
import config from '../../../config';

class Item implements IItem {
  name: string;
  label?: string;
  category: ItemCategoryType;
  count: number;
  weight?: number;
  metadata?: { [key: string]: unknown }[];

  constructor(item: ItemType) {
    this.name = item.name;
    this.count = item.count;
    this.metadata = item.metadata;
    Object.entries(config.items).forEach(([category, items]) => {
      const itemConfig = items.find((item: ItemType) => item.name === this.name);

      if (itemConfig !== undefined) {
        this.category = category as ItemCategoryType;
        this.weight = itemConfig.weight;
        return;
      }
    });
  }
}

export { Item };
