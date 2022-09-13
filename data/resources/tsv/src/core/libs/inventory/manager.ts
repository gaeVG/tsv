import { InventoryType, InventoryContainerType, IInventory } from '../../declares/inventory';
import { Inventory } from './inventory';
import { Log } from '../log';
import { LogData } from '../../declares/log';
import { EnumLogContainer } from '../../declares/log';

const log: LogData = {
  namespace: 'CoreInventory',
  container: EnumLogContainer.Manager,
};

class InventoryManager {
  private manager: Inventory[];

  constructor(inventories: InventoryType[]) {
    this.manager = [];
    console.log('inventory manager constructor')
    inventories.map((inventory) => {
      this.manager.push(new Inventory(inventory));
    });
  }

  get Manager(): IInventory[] {
    return this.getAll().map((i) => i as IInventory);
  }
  set Manager(inventories: IInventory[]) {
    inventories.map((inventory) => {
      const inventoryManager = this.getOne(inventory.container);
      if (inventoryManager !== undefined) {
        this.updateOne(inventoryManager);
      } else {
        this.addOne(inventory as InventoryType);
      }
    });
  }

  private getAll(): Inventory[] {
    return this.manager;
  }
  private updateOne(updateInventory: Inventory) {
    try {
      if (!this.manager.find((i) => i.container === updateInventory.container)) {
        throw Error(`Inventory ${updateInventory.container} doesn't exists`);
      } else {
        this.manager = this.manager.reduce((manager, currentInventory) => {
          if (currentInventory.container === updateInventory.container) {
            currentInventory.items = updateInventory.items;
          }
          manager.push(currentInventory);
          return manager;
        }, [] as Inventory[]);
      }
    } catch (error) {
      Log.error({
        ...log,
        message: error instanceof Error ? error.message : error.message,
      });
    }
  }
  private getOne(container: InventoryContainerType): Inventory | undefined {
    return this.manager.find((i) => i.container === container);
  }
  private addOne(addInventory: InventoryType): Inventory | false {
    try {
      if (this.manager.find((i) => i.container === addInventory.container)) {
        throw Error(`Inventory ${addInventory.container} already exists`);
      }
      const newInventory = new Inventory(addInventory);
      this.manager.push(newInventory);

      return newInventory;
    } catch (error) {
      Log.error({
        namespace: 'InventoryCore',
        container: 'Class',
        location: 'addOne()',
        message: error.message instanceof Error ? error.message.message : error.message,
      });

      return false;
    }
  }
}

export { InventoryManager };
