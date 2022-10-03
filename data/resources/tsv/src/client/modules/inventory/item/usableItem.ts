import { Item } from '../../../../core/libs/item';
import { tsv } from '../../..';
import { IItem, ItemType, IUsableItem } from '../../../../core/declares/item';
import { InventoryFromType } from '../../../../core/declares/inventory';

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
