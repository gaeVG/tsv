import { LogData, EnumLogContainer } from '../../declares/log';
import { InventoryType, InventoryContainerType, IInventory, InventoryItemNotFoundError } from '../../declares/inventory';
import { ItemType, IItem } from '../../declares/item';
import { Item } from '../item/item';

const log: LogData = {
  namespace: 'CoreInventory',
  container: EnumLogContainer.Class,
}

class Inventory implements IInventory {
  container: InventoryContainerType;
  items: IItem[];

  constructor(inventory: InventoryType) {
    console.log('inventory constructor')
    this.container = inventory.container;
    this.items = inventory.items.map((item) => new Item(item));
  }

  get All() {
    return this.items;
  }

  addItem(item: ItemType): boolean { 
    let foundItem = false;

    const items = this.items.reduce((inventoryItems, currentItem) => {
      if (currentItem.name === item.name) {
        if (item.metadata) {
          if (JSON.stringify(currentItem.metadata) === JSON.stringify(item.metadata)) {
            foundItem = true;
            currentItem.count += item.count;
          }
        } else {
          foundItem = true;
          currentItem.count += item.count;
        }
      }

      inventoryItems.push(currentItem);
      return inventoryItems;
    }, [] as Item[]);

    if (!foundItem) {
      this.items.push(item as IItem);
    } else {
      this.items = items;
    }

    return true;
  }
  updateItem(itemUpdate: IItem): IItem | Error {
    log.location = 'updateItem()';

    try {
      let itemFound: IItem;

      this.items = this.items.reduce((inventoryItems, currentItem) => {
        if (currentItem.name === itemUpdate.name) {
          if (itemUpdate.metadata !== undefined) {
            if (JSON.stringify(currentItem.metadata) === JSON.stringify(itemUpdate.metadata)) {
              currentItem.count = itemFound.count;
            }
          } else {
            currentItem.count = itemFound.count;
          }

          itemFound = currentItem;
        }

        inventoryItems.push(currentItem);
        return inventoryItems;
      }, [] as Item[]);

      if (itemFound === undefined) {
        throw new InventoryItemNotFoundError(this.container, itemUpdate)
      }

      return itemFound;
    } catch (error) {
      if (error instanceof InventoryItemNotFoundError) {
        return error
      }
    }
  }
  // getItem(item: ItemType) : IItem[] {
  //   return this.items.filter(i => {
  //     if (i.name === item.name) {
  //       if (item.metadata) {
  //         return JSON.stringify(i.metadata) === JSON.stringify(item.metadata);
  //       }

  //       return true;
  //     }

  //   });
  //}
  // removeItem(item) {
  //     this.items = this.items.filter(i => i !== item);
  // }
}

export { Inventory };
