import { ItemCategoryType } from '../types';

interface IItem {
  name: string;
  label?: string;
  category: ItemCategoryType | undefined;
  count: number;
  metadata?: { [key: string]: unknown }[];
  weight?: number;
}

export { IItem };
