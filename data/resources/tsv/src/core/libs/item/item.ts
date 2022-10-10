import { IItem, ItemType, ItemCategoryType, ItemStatusEffectType } from '../../declares/item';
import config from '../../../config';

class Item implements IItem {
  name: string;
  label?: string;
  category: ItemCategoryType;
  count: number;
  weight?: number;
  metadata?: unknown;
  props?: string;
  effect?: ItemStatusEffectType;

  constructor(item: ItemType) {
    this.name = item.name;
    this.count = item.count;
    this.metadata = item.metadata;
    Object.entries(config.items).every(([category, items]) => {
      const itemConfig = items.find((item: ItemType) => item.name === this.name);
      if (itemConfig !== undefined) {
        this.category = category as ItemCategoryType;
        this.weight = itemConfig.weight;
        this.props = itemConfig.props;

        return false;
      }

      return true;
    });
    this.effect = item.effect;
  }
}

export { Item };
