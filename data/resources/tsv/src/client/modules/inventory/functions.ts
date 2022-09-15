import { LogData, EnumLogContainer } from '../../../core/declares/log';
import {
  IItem,
  ItemFoodEnum,
  IUsableItem,
  ItemCategoryEnum,
  ItemWeaponMeleeEnum,
  ItemClotheLegsEnum,
  UnknownItemError,
  ItemDrinkEnum,
} from '../../../core/declares/item';
import { IInventory } from '../../../core/declares/inventory';
import { Player, Ped } from '../../../core/libs';
import { Wait } from '../../../core/libs';
import {} from '../../../core/declares/item/enum/clothe';
import { InventoryContainerType } from '../../../core/declares/inventory';
import { Clothe, Drink, Food, Weapon, Key } from './item';
import moduleConfig from './config';
import { tsv } from '../../';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
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
  while (player.Character.Speed > 0.1) {
    await Wait(100);
  }

  tsv.events.trigger({
    name: 'getAllInventories',
    module: 'inventory',
    onNet: true,
    callback(_, inventory: IInventory[]) {
      tsv.nui.trigger({ name: 'open-player-inventory', module: 'inventory', payload: inventory });

      tsv.nui.listen({
        name: 'close-inventory',
        module: 'inventory',
        removeAfterTriggered: true,
        handler: () => {
          global.SetNuiFocus(false, false);
        },
      });
      tsv.nui.listen({
        name: 'display-character',
        module: moduleConfig.name,
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
        module: moduleConfig.name,
        handler: () => {
          playerOverlay.delete();
          global.SetFrontendActive(false);
        },
      });
    },
  });
}

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
        if (item.name === 'key') {
          return new Key(item);
        }

        throw new UnknownItemError(item);
      default:
        throw new UnknownItemError(item);
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
  }
}
function useItem([container, usingItem]: [InventoryContainerType, IItem]): void {
  log.location = 'useItem()';

  try {
    const item = getItemClass(usingItem) as IUsableItem;
    item.getAllowToUse((canUseItem) => canUseItem && item.use(), container);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}

export { openInventory, useItem };
