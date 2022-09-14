import { ItemType, ItemFoodEnum, ItemDrinkEnum } from '../../core/declares/item';
import _t from '../i18n';

export default [
  {
    name: ItemFoodEnum.BREAD,
    label: _t(`module.inventory.item.${ItemFoodEnum.BREAD}`),
    weight: 250,
    props: 'prop_cs_burger_01',
  },
  {
    name: ItemDrinkEnum.WATER,
    label: _t(`module.inventory.items.${ItemDrinkEnum.WATER}`),
    weight: 100,
    props: 'vw_prop_casino_water_bottle_01a',
  },
  {
    name: ItemDrinkEnum.BEER,
    label: _t(`module.inventory.items.${ItemDrinkEnum.BEER}`),
    weight: 100,
    props: 'prop_beer_pissh',
  },
] as ItemType[];
