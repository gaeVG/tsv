import { ItemCategoryEnum } from '../enum';

type ItemCategoryType =
  | ItemCategoryEnum.COMPONENT
  | ItemCategoryEnum.CONSOMMABLE
  | ItemCategoryEnum.RESSOURCE
  | ItemCategoryEnum.WEAPON
  | ItemCategoryEnum.CLOTHE;

export { ItemCategoryType };
