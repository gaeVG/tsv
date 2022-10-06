import { ItemType, ItemMoneyEnum } from '../../core/declares/item';
import _t from '../i18n';

export default [
  // Money items
  {
    name: ItemMoneyEnum.BANKNOTE,
    label: _t(`module.inventory.item.${ItemMoneyEnum.BANKNOTE}`),
    weight: 10,
    props: 'p_banknote_s',
  },
  {
    name: ItemMoneyEnum.COIN,
    label: _t(`module.inventory.item.${ItemMoneyEnum.COIN}`),
    weight: 10,
    props: 'vw_prop_vw_coin_01a',
  },
] as ItemType[];
