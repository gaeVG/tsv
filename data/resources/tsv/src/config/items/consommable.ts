// Declarations
import { ItemType, ItemFoodEnum, ItemDrinkEnum } from '@declares/item';
// Config
import _t from '@config/i18n';

export default [
  // Food items
  {
    name: ItemFoodEnum.BREAD,
    label: _t(`module.inventory.item.${ItemFoodEnum.BREAD}`),
    weight: 250,
    props: 'prop_cs_burger_01',
    effect: {
      hunger: 100,
    },
  },
  // Drink items
  {
    name: ItemDrinkEnum.WATER,
    label: _t(`module.inventory.items.${ItemDrinkEnum.WATER}`),
    weight: 100,
    props: 'vw_prop_casino_water_bottle_01a',
    effect: {
      thirst: 22,
    },
  },
  {
    name: ItemDrinkEnum.BEER,
    label: _t(`module.inventory.items.${ItemDrinkEnum.BEER}`),
    weight: 100,
    props: 'prop_beer_pissh',
    effect: {
      thirst: 10,
    },
  },
] as ItemType[];
