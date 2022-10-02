import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { InventoryContainerType, InventoryFromType } from '../../../core/declares/inventory';
import { IInventory } from '../../../core/declares/inventory';
import { IUser, UserNotFoundError } from '../../../core/declares/user';
import { IItem, ItemShouldNoLongerExistError } from '../../../core/declares/item';
import moduleConfig from './config';
import { tsv } from '../..';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
};

function getAllInventories(source: string, target?: string): IInventory[] | undefined {
  try {
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
  from: InventoryFromType,
  inventoryItem: IItem,
): number | Error {
  try {
    let inventory: IInventory;
    if ((from.owner as unknown) instanceof Number) {
      const target = tsv.users.getOneBySource(from.owner.toString()) as IUser;

      inventory = getInventory(target.source, from.container);
    } else if (from.owner === 'player') {
      inventory = getInventory(source, from.container);
    }

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
function consumeItem(source: string, inventoryItem: IItem, from: InventoryFromType): IItem | Error {
  log.location = 'useItem()';
  try {
    tsv.log.debug({ ...log, message: `Consuming item ${inventoryItem.name}` });
    const itemCount = getItemCount(source, from, inventoryItem);
    if (itemCount instanceof Error) return itemCount;

    if (itemCount === 0) {
      throw new ItemShouldNoLongerExistError(inventoryItem);
    }

    const target = tsv.users.getOneBySource(source) as IUser;
    const targetInventory = getInventory(source, from.container, target.id) as IInventory;
    const targetItem = targetInventory.getItem(inventoryItem);

    const error = targetInventory.updateItem({ ...targetItem, count: targetItem.count - 1 });

    if (error instanceof Error) {
      return error;
    }

    target.inventories.Manager = [targetInventory];
    tsv.users.updateOne(target);
    console.log(targetInventory.getItem(inventoryItem));
    return targetInventory.getItem(inventoryItem);
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });

    return error;
  }
}
function canUseItem(source: string, item: IItem, container: InventoryFromType): boolean | Error {
  try {
    return getItemCount(source, container, item) > 0;
  } catch (error) {
    return error;
  }
}

export { getInventory, getAllInventories, getItemCount, canUseItem, consumeItem };
