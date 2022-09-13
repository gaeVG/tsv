import { Color, Point, Size } from '../../../../utils';
import { AbstractUIMenuPanel } from './';
import { Menu, Rectangle } from '../../../';
export class UIMenuStatisticsPanel extends AbstractUIMenuPanel {
  constructor(item, divider = true) {
    super();
    this._divider = true;
    this._items = [];
    this.background = new Rectangle(new Point(), new Size(431, 47), new Color(170, 0, 0, 0));
    if (item) {
      this.addItem(item);
    }
    this.Divider = divider;
  }
  get Divider() {
    return this._divider;
  }
  set Divider(value) {
    this._divider = value || false;
  }
  get Items() {
    return this._items;
  }
  set Items(value) {
    this._items = value;
  }
  addItem(item) {
    const items = Array.isArray(item) ? item : [item];
    this._items.push(...items);
  }
  removeItem(itemOrIndex) {
    if (typeof itemOrIndex === 'number') {
      this._items = this._items.filter((i, index) => index !== itemOrIndex);
    } else {
      this._items = this._items.filter((i) => i.id !== itemOrIndex.id);
    }
  }
  setVerticalPosition(y) {
    super.setVerticalPosition(y);
    this._items.forEach(async (item, index) => {
      const itemCountOffset = 40 * (index + 1);
      const yOffset = y + itemCountOffset - 22;
      item.backgroundBar.pos.Y = yOffset;
      item.activeBar.pos.Y = yOffset;
      item.text.pos.Y = yOffset - 12;
      if (this._divider) {
        item.divider.forEach(async (divider) => {
          divider.pos.Y = yOffset;
        });
      }
    });
  }
  draw() {
    if (this.enabled) {
      super.draw();
      const x = this.parentItem?.offset.X ?? 0 + (this.ParentMenu?.WidthOffset ?? 0) / 2;
      this._items.forEach(async (item, index) => {
        const itemCountOffset = 40 * (index + 1);
        item.backgroundBar.pos.X = x + 200;
        item.activeBar.pos.X = x + 200;
        item.text.pos.X = x + 13;
        item.backgroundBar.draw(undefined, Menu.screenResolution);
        item.activeBar.draw(undefined, Menu.screenResolution);
        item.text.draw(undefined, Menu.screenResolution);
        if (this._divider) {
          item.divider.forEach(async (divider, index) => {
            const dividerWidthOffset = (index + 1) * 40;
            divider.pos.X = x + dividerWidthOffset + 200;
            this.background.size.height = itemCountOffset + 47 - 39;
            divider.draw(undefined, Menu.screenResolution);
          });
        }
      });
    }
  }
}
