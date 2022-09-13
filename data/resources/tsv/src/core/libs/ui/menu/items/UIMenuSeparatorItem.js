import { UIMenuItem } from './';
import { Alignment } from '../../../enums';
import { Menu } from '../';
export class UIMenuSeparatorItem extends UIMenuItem {
  constructor(text) {
    super(text ?? '');
    this.supportsDescription = false;
    this.supportsPanels = false;
    this.supportsLeftBadge = false;
    this.supportsRightBadge = false;
    this.supportsRightLabel = false;
    this.text.alignment = Alignment.Centered;
  }
  setVerticalPosition(y) {
    const yOffset = y + this.offset.Y;
    this.rectangle.pos.Y = yOffset + 144;
    this.text.pos.Y = yOffset + 147;
  }
  draw() {
    const width = 431 + (this.parent ? this.parent.WidthOffset : 0);
    this.rectangle.size.width = width;
    this.rectangle.pos.X = this.offset.X;
    this.rectangle.draw(undefined, Menu.screenResolution);
    if (this.text.caption !== '') {
      this.text.pos.X = this.offset.X + width / 2;
      this.text.draw(undefined, Menu.screenResolution);
    }
  }
}
