// Declarations
import { InventoryFromType } from '@declares/inventory';
import { ItemType, IItem } from '@declares/item';
// Abstract class
import { UsableItem } from './usableItem';

class Clothe extends UsableItem {
  constructor(item: ItemType) {
    super(item);
  }

  async use(container: InventoryFromType): Promise<IItem | Error> {
    try {
      const clothe = await this.consumeItem(container);
      if (clothe instanceof Error) {
        throw clothe;
      }

      console.log(`Je mets ${this.name}`);
    } catch (error) {
      return error;
    }
  }
}

export { Clothe };
