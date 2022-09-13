import { Crypto } from '../../../../utils';
import { Sprite } from '../../../';
import { Menu } from '../../';
export class AbstractUIMenuPanel {
  constructor() {
    this.id = Crypto.uuidv4();
    this.enabled = true;
  }
  get ParentMenu() {
    return this.parentItem ? this.parentItem.parent : undefined;
  }
  get ParentItem() {
    return this.parentItem ?? undefined;
  }
  set ParentItem(value) {
    this.parentItem = value;
  }
  get Enabled() {
    return this.enabled;
  }
  set Enabled(value) {
    this.enabled = value;
  }
  get Height() {
    return this.background ? this.background.size.height : 0;
  }
  setVerticalPosition(y) {
    if (this.background) this.background.pos.Y = y;
  }
  draw() {
    if (this.background) {
      this.background.size.width = 431 + (this.ParentMenu ? this.ParentMenu.WidthOffset : 0);
      this.background.pos.X = this.parentItem ? this.parentItem.offset.X : 0;
      if (this.background instanceof Sprite) {
        this.background.draw(Menu.screenResolution);
      } else {
        this.background.draw(undefined, Menu.screenResolution);
      }
    }
  }
}
