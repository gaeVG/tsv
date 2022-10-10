import { ItemCategoryEnum } from '../../core/declares/item';
import itemsConsommable from './consommable';
import itemsHardware from './hardware';
import itemsWeapon from './weapon';
import itemsMoney from './money';
import itemsCard from './card';

export default {
  [ItemCategoryEnum.CONSOMMABLE]: itemsConsommable,
  [ItemCategoryEnum.HARDWARE]: itemsHardware,
  [ItemCategoryEnum.WEAPON]: itemsWeapon,
  [ItemCategoryEnum.MONEY]: itemsMoney,
  [ItemCategoryEnum.CARD]: itemsCard,
};
