import { ItemCategoryEnum } from '../enum';

type ItemCategoryType =
  | ItemCategoryEnum.COMPONENT
  | ItemCategoryEnum.CONSOMMABLE
  | ItemCategoryEnum.RESSOURCE
  | ItemCategoryEnum.WEAPON
  | ItemCategoryEnum.CLOTHE
  | ItemCategoryEnum.HARDWARE;

export { ItemCategoryType };
