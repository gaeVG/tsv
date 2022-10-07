// Declarations
import { TypeMenuType, IMenuButton } from '@declares/menu';

type MenuProps = {
  type?: TypeMenuType;
  module: string;
  name: string;
  title: string;
  buttons: IMenuButton[];
};

export { MenuProps };
