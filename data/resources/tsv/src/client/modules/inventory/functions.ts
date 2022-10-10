// Native wrapper
import { Player, Ped, Wait } from '@native//';
// Declarations
import { LogData, EnumLogContainer } from '@declares/log';
import {
  IItem,
  ItemFoodEnum,
  IUsableItem,
  ItemCategoryEnum,
  ItemWeaponMeleeEnum,
  ItemClotheLegsEnum,
  UnknownItemError,
  ItemDrinkEnum,
} from '@declares/item';
import { IInventory, InventoryFromType } from '@declares/inventory';
// Module
import { Clothe, Drink, Food, Weapon, Key, BankCard, Money } from './item';
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: config.debug,
};

async function createPedOverlay(player: Player): Promise<Ped> {
  tsv.log.safemode({
    ...log,
    message: `Creating ped overlay`,
  });

  const pedOverlay = player.Ped.clone();
  pedOverlay.IsVisible = false;
  pedOverlay.IsPositionFrozen = true;
  await Wait(200);
  pedOverlay.Model.markAsNoLongerNeeded();
  global.GivePedToPauseMenu(pedOverlay.Handle, 2);
  global.ReplaceHudColourWithRgba(117, 0, 0, 0, 0);
  global.SetPauseMenuPedLighting(true);
  global.SetPauseMenuPedSleepState(true);

  return pedOverlay;
}
async function openInventory() {
  const player = new Player();
  let playerOverlay: Ped;
  global.SetNuiFocus(true, true);

  const playerInventories = await (tsv.events.trigger({
    name: 'getAllInventories',
    module: 'inventory',
    isCallback: true,
    onNet: true,
  }) as Promise<IInventory[]>);

  tsv.nui.trigger({
    name: 'open-player-inventory',
    module: 'inventory',
    payload: playerInventories,
  });

  tsv.nui.listen({
    name: 'closeInventory',
    module: 'inventory',
    removeAfterTriggered: true,
    handler: () => global.SetNuiFocus(false, false),
  });
  tsv.nui.listen({
    name: 'display-character',
    module: config.moduleName,
    handler: async () => {
      global.SetFrontendActive(true);
      global.ActivateFrontendMenu('FE_MENU_VERSION_EMPTY', false, -1);
      await Wait(100);
      global.SetMouseCursorVisibleInMenus(false);
      playerOverlay = await createPedOverlay(player);
    },
  });
  tsv.nui.listen({
    name: 'hide-character',
    module: config.moduleName,
    handler: () => {
      playerOverlay.delete();
      global.SetFrontendActive(false);
    },
  });
}

/**
 * Get item class from item category
 * @param {IItem} item - Item to get class from
 * @returns {IUsableItem} - Usable item interface
 */
function getItemClass(item: IItem): IUsableItem | Error {
  log.location = 'getItemClass()';

  try {
    switch (item.category) {
      case ItemCategoryEnum.CONSOMMABLE:
        if (Object.values(ItemFoodEnum).find((foodItem) => foodItem === item.name))
          return new Food(item);
        if (Object.values(ItemDrinkEnum).find((drinkItem) => drinkItem === item.name))
          return new Drink(item);

        throw new UnknownItemError(item);
      case ItemCategoryEnum.WEAPON:
        if (Object.values(ItemWeaponMeleeEnum).find((weaponItem) => weaponItem === item.name))
          return new Weapon(item);

        throw new UnknownItemError(item);
      case ItemCategoryEnum.CLOTHE:
        if (Object.values(ItemClotheLegsEnum).find((clotheItem) => clotheItem === item.name))
          return new Clothe(item);

        throw new UnknownItemError(item);
      case ItemCategoryEnum.HARDWARE:
        switch (item.name) {
          case 'key':
            return new Key(item);
          default:
            throw new UnknownItemError(item);
        }
      case ItemCategoryEnum.CARD:
        switch (item.name) {
          case 'bank_card':
            return new BankCard(item);
          default:
            throw new UnknownItemError(item);
        }
      case ItemCategoryEnum.MONEY:
        return new Money(item);
      default:
        throw new UnknownItemError(item);
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
  }
}
async function useItem([container, usingItem]: [InventoryFromType, IItem]): Promise<IItem | Error> {
  log.location = 'useItem()';
  // Polymporphic usable item depending on item category
  const item = getItemClass(usingItem) as IUsableItem;
  if (item instanceof Error) return item;
  tsv.log.debug({ ...log, message: `Using item ${item.name}` });
  return await item.use(container);
}

export { openInventory, useItem };
