import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { InventoryContainerType } from '../../../core/declares/inventory';
import { IInventory } from '../../../core/declares/inventory';
import { IUser, UserNotFoundError } from '../../../core/declares/user';
import { IItem } from '../../../core/declares/item';
import moduleConfig from './config';
import { tsp } from '../..';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
};

function getAllInventories(source: string, target?: string): IInventory[] | undefined {
  try {
    console.log('source', source);
    let tspUser: IUser;

    if (target !== undefined) {
      tspUser = tsv.users.getOnebyId(target) as IUser;
    } else {
      tspUser = tsv.users.getOneBySource(source) as IUser;
    }

    return tspUser.inventories.Manager;
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });
  }
}
function getInventory(
  source: string,
  container: InventoryContainerType,
  target?: string,
): IInventory | undefined {
  try {
    let tspUser: IUser;

    if (target !== undefined) {
      tspUser = tsv.users.getOnebyId(target) as IUser;
    } else {
      tspUser = tsv.users.getOneBySource(source) as IUser;
    }
    return tspUser.inventories.Manager.find((inventory) => inventory.container === container);
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });
  }
}

function getItemCount(
  source: string,
  container: InventoryContainerType,
  inventoryItem: IItem,
): number | Error {
  try {
    const user = tsv.users.getOneBySource(source) as IUser;

    const inventory = user.inventories.Manager.find(
      (inventory) => inventory.container === container,
    );

    return inventory.items.find((item) => item.name === inventoryItem.name).count;
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return error;
    }

    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });

    return new Error('Item not found');
  }
}
function useItem(
  source: string,
  container: InventoryContainerType,
  inventoryItem: IItem,
): IItem | Error {
  log.location = 'useItem()';

  try {
    const user = tsv.users.getOneBySource(source) as IUser;
    const userInventory = user.inventories.Manager.find(
      (inventory) => inventory.container === container,
    );
    const itemFound = userInventory.updateItem({
      ...inventoryItem,
      count: inventoryItem.count - 1,
    });

    user.inventories.Manager = [userInventory];
    tsv.users.updateOne(user);

    return itemFound;
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });
  }
}

export { getInventory, getAllInventories, getItemCount, useItem };
