import { UIMenuItem } from '../';
import { Rectangle, Sprite } from '../../../';
import { Menu } from '../../';
export declare abstract class AbstractUIMenuPanel {
  readonly id: string;
  protected parentItem: UIMenuItem | undefined;
  protected enabled: boolean;
  protected readonly background: Sprite | Rectangle | undefined;
  get ParentMenu(): Menu | undefined;
  get ParentItem(): UIMenuItem | undefined;
  set ParentItem(value: UIMenuItem | undefined);
  get Enabled(): boolean;
  set Enabled(value: boolean);
  get Height(): number;
  setVerticalPosition(y: number): void;
  draw(): void;
}
