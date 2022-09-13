import { DnDContainerEnum, DnDItemEnum } from '..';

type DnDContainerType =
  | DnDContainerEnum.PLAYER_COMPONENTS
  | DnDContainerEnum.PLAYER_INVENTORY
  | DnDContainerEnum.TARGET_INVENTORY;

type DnDItemType =
  | DnDItemEnum.CONSOMMABLE
  | DnDItemEnum.RESSOURCE
  | DnDItemEnum.WEAPON
  | DnDItemEnum.COMPONENT
  | DnDItemEnum.CLOTHE
  | DnDItemEnum.HARDWARE;

export { DnDContainerType, DnDItemType };
