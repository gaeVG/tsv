import { IconType } from '../../nui';
import { TypeButtonMenuEnum } from '..';

type TypeButtonMenuType =
  | TypeButtonMenuEnum.DEFAULT
  | TypeButtonMenuEnum.CHECKBOX
  | TypeButtonMenuEnum.CONFIRM
  | TypeButtonMenuEnum.RANGE
  | TypeButtonMenuEnum.SLIDER
  | TypeButtonMenuEnum.LABEL
  | TypeButtonMenuEnum.UNKNOWN;

type ButtonMenuType = {
  type: TypeButtonMenuType;
  name: string;
  value?: unknown;
  min?: number;
  max?: number;
  icon?: IconType;
  description?: string;
};

export { TypeButtonMenuType, ButtonMenuType };
