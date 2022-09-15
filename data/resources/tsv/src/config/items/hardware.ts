import { ItemType, ItemLocksmithEnum } from '../../core/declares/item';
import _t from '../i18n';

export default [
  // Locksmith items
  {
    name: ItemLocksmithEnum.KEY,
    label: _t(`module.inventory.item.${ItemLocksmithEnum.KEY}`),
    weight: 10,
    props: 'prop_cs_keys_01',
  },
] as ItemType[];
