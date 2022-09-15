import { ItemCategoryEnum } from '../../core/declares/item';
import itemsConsommable from './consommable';
import itemsHardware from './hardware';
import itemsWeapon from './weapon';

export default {
  [ItemCategoryEnum.CONSOMMABLE]: itemsConsommable,
  [ItemCategoryEnum.HARDWARE]: itemsHardware,
  [ItemCategoryEnum.WEAPON]: itemsWeapon,
};
