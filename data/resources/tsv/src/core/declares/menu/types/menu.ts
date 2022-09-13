import { ButtonMenuType } from '..';
import { TypeMenuEnum } from '..';

type TypeMenuType =
  | TypeMenuEnum.DEFAULT
  | TypeMenuEnum.DIALOG
  | TypeMenuEnum.LIST
  | TypeMenuEnum.RADIAL
  | TypeMenuEnum.CIRCULAR;

type MenuType = {
  type: TypeMenuType;
  module: string;
  name: string;
  title: string;
  subtitle?: string;
  buttons: ButtonMenuType[];
};

export { MenuType, TypeMenuType };
