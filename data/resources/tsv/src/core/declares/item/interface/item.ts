import { ItemCategoryType, ItemStatusEffectType } from '..';

interface IItem {
  name: string;
  label?: string;
  category: ItemCategoryType | undefined;
  count: number;
  metadata?: unknown;
  weight?: number;
  props?: string;
  effect?: ItemStatusEffectType;
}

export { IItem };
