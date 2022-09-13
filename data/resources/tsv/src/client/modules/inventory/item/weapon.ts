import { ItemType } from '../../../../core/declares/item';
import { UsableItem } from './usableItem';

class Weapon extends UsableItem {
  constructor(item: ItemType) {
    super(item);
  }

  use() {
    console.log(`J'équipe mon ${this.name}`);
  }
}

export { Weapon };
