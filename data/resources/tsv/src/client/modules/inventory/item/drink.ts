import { ItemType } from '../../../../core/declares/item';
import { UsableItem } from './usableItem';

class Drink extends UsableItem {
  constructor(item: ItemType) {
    super(item);
  }

  use() {
    console.log(`Je bois ${this.name}`);
  }
}

export { Drink };
