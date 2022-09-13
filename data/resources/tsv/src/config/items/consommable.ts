import { ItemType, ItemFoodEnum, ItemDrinkEnum } from '../../core/declares/item';
import _t from '../i18n';

export default [
  {
    name: ItemFoodEnum.BREAD,
    label: _t(`module.inventory.item.${ItemFoodEnum.BREAD}`),
    weight: 250,
    props: 'props_bread',
  },
  {
    name: ItemDrinkEnum.WATER,
    label: _t(`module.inventory.items.${ItemDrinkEnum.WATER}`),
    weight: 100,
    props: 'props_water',
  },
  {
    name: ItemDrinkEnum.BEER,
    label: _t(`module.inventory.items.${ItemDrinkEnum.BEER}`),
    weight: 100,
    props: 'props_beer',
  },
] as ItemType[];
