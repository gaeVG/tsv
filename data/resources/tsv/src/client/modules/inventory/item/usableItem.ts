import { Item } from '../../../../core/libs/item';
import { tsv } from '../../..';
import { IItem, ItemType, IUsableItem } from '../../../../core/declares/item';
import { InventoryContainerType } from '../../../../core/declares/inventory';

abstract class UsableItem extends Item implements IUsableItem {
  constructor(item: ItemType) {
    super(item);
  }

  getAllowToUse(useItem: (canUseItem: boolean) => void, container: InventoryContainerType) {
    (
      tsv.events.trigger({
        name: 'useItem',
        module: 'inventory',
        onNet: true,
        isCallback: true,
        data: [container, this],
      }) as Promise<IItem | Error>
    ).then((item: IItem | Error) => {
      useItem(!(item instanceof Error));
    });
  }

  abstract use(): void;
}

export { UsableItem };
