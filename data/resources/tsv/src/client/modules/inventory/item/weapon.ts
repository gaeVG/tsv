import { ItemType } from '../../../../core/declares/item';
import { UsableItem } from './usableItem';

class Weapon extends UsableItem {
  constructor(item: ItemType) {
    super(item);
  }

  async use(): Promise<Error> {
    try {
      console.log(`J'équipe mon ${this.name}`);
    } catch (error) {
      return error;
    }
  }
}

export { Weapon };
