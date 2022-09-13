import { ItemType } from '../../../../core/declares/item';
import { UsableItem } from './usableItem';

class Clothe extends UsableItem {
  constructor(item: ItemType) {
    super(item);
  }

  use() {
    console.log(`Je mets ${this.name}`);
  }
}

export { Clothe };
