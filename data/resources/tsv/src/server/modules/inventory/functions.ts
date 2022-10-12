// Declarations
import { LogData, EnumLogContainer } from '@declares/log';
import { InventoryContainerType, InventoryFromType } from '@declares/inventory';
import { IInventory } from '@declares/inventory';
import { IUser, UserNotFoundError } from '@declares/user';
import { IItem, ItemShouldNoLongerExistError } from '@declares/item';
// Module
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: config.debug,
};

/**
 * Recover all the inventories of the target, or by default those of the player
 * @param {string} source - Source of the player
 * @param {string} target - Source of the optionnal target
 * @returns {IInventory[] | Error} Return the inventories of the target, or by default those of the player
 */
function getAllInventories(source: string, target?: string): IInventory[] | Error {
  try {
    let user: IUser;

    if (target !== undefined) {
      user = tsv.users.getOnebyId(target) as IUser;
    } else {
      user = tsv.users.getOneBySource(source) as IUser;
    }
    return user.inventories.Containers;
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });
    return error;
  }
}
/**
 * Recover the inventory of the target, or by default the inventory of the player
 * @param {string} source - Source of the player
 * @param {InventoryContainerType} container - Container of the inventory to recover
 * @param {string} target - Source of the optionnal target
 * @returns {IInventory | Error} Return the inventory of the target, or by default the inventory of the player
 */
function getInventory(
  source: string,
  container: InventoryContainerType,
  target?: string,
): IInventory | undefined {
  try {
    let user: IUser;

    if (target !== undefined) {
      user = tsv.users.getOnebyId(target) as IUser;
    } else {
      user = tsv.users.getOneBySource(source) as IUser;
    }
    return user.inventories.Containers.find((inventory) => inventory.container === container);
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });
  }
}
// TODO: Recover target inventory item from other source than the player
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
/**
 * Consume an item from the source inventory
 * @param source
 * @param inventoryItem
 * @param from
 * @returns
 */
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

    target.inventories.Containers = [targetInventory];

    tsv.users.updateOne(target);

    return targetInventory.getItem(inventoryItem);
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });

    return error;
  }
}
/**
 * Check if the source inventory contains the item
 * @param source
 * @param item
 * @param container
 * @returns
 */
function canUseItem(source: string, item: IItem, container: InventoryFromType): boolean | Error {
  try {
    return getItemCount(source, container, item) > 0;
  } catch (error) {
    return error;
  }
}

export { getInventory, getAllInventories, getItemCount, canUseItem, consumeItem };
