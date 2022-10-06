import { ItemType, ItemCardEnum } from '../../core/declares/item';
import _t from '../i18n';

export default [
  // Money items
  {
    name: ItemCardEnum.BANK,
    label: _t(`module.inventory.item.${ItemCardEnum.BANK}`),
    weight: 10,
    props: 'prop_cs_business_card',
  },
  {
    name: ItemCardEnum.LOYALTY,
    label: _t(`module.inventory.item.${ItemCardEnum.LOYALTY}`),
    weight: 10,
    props: 'prop_cs_r_business_card',
  },
] as ItemType[];
