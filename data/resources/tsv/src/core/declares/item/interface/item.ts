import { ItemCategoryType } from '../types';

interface IItem {
  name: string;
  label?: string;
  category: ItemCategoryType | undefined;
  count: number;
  metadata?: unknown;
  weight?: number;
  props?: string;
}

export { IItem };
