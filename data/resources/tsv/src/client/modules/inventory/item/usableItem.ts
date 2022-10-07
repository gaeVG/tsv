// Declarations
import { IItem, ItemType, IUsableItem } from '@declares/item';
import { InventoryFromType } from '@declares/inventory';
// Core libs
import { Item } from '@libs/item';
// Core
import { tsv } from '@tsv';

abstract class UsableItem extends Item implements IUsableItem {
  constructor(item: ItemType) {
    super(item);
  }

  async consumeItem(container: InventoryFromType): Promise<IItem | Error> {
    return tsv.events.trigger({
      name: 'consumeItem',
      module: 'inventory',
      onNet: true,
      isCallback: true,
      data: [this, container],
    }) as Promise<IItem | Error>;
  }

  async canUseItem(from: InventoryFromType): Promise<boolean | Error> {
    return tsv.events.trigger({
      name: 'canUseItem',
      module: 'inventory',
      onNet: true,
      isCallback: true,
      data: [this, from],
    }) as Promise<boolean | Error>;
  }

  abstract use(container: InventoryFromType): Promise<IItem | Error>;
}

export { UsableItem };
