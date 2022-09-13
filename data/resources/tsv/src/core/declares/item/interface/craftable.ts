import { Item } from '../../../libs/item';

interface IItemCraftable {
  craft(...items: Item[]): Item;
}

export { IItemCraftable };
