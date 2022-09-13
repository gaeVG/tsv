import { ItemCategoryEnum } from '../../core/declares/item';
import itemsConsommable from './consommable';
import itemsWeapon from './weapon';

export default {
  [ItemCategoryEnum.CONSOMMABLE]: itemsConsommable,
  [ItemCategoryEnum.WEAPON]: itemsWeapon,
};
