import { TypeButtonMenuType } from '../';
import { IconType } from '../../nui';

interface IMenuButton {
  index?: number;
  type: TypeButtonMenuType;
  name: string;
  value: unknown;
  previous_value?: unknown;
  values?: unknown[];
  min?: number;
  max?: number;
  disabled?: boolean;
  icon?: IconType;
  description?: string;
  onSelected?: (menu: IMenuButton) => void;
}

export { IMenuButton };
