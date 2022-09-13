import { Item } from '../../../libs/item';

interface IItemSplitable {
  split(item: Item): Item | Item[];
}

export { IItemSplitable };
