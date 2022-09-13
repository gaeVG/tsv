import { TypeMenuType, IMenuButton } from '..';

interface IMenu {
  hidden: boolean;
  type: TypeMenuType;
  module: string;
  name: string;
  title: string;
  subtitle?: string;
  position?: string;
  size?: string;
  colors?: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  buttons: IMenuButton[];
  open(): void;
  close(): void;
}

export { IMenu };
