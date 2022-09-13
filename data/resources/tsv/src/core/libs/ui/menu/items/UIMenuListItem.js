import { Menu, Sprite, Text } from '../../';
import { Alignment, Font } from '../../../enums';
import { Color, LiteEvent, Point, Size, String } from '../../../utils';
import { UIMenuItem } from './';
export class UIMenuListItem extends UIMenuItem {
  constructor(text, items, startIndex = 0, description, arrowOnlyOnSelected = true) {
    super(text, description);
    this.listChanged = new LiteEvent();
    this.listSelected = new LiteEvent();
    this.supportsRightBadge = false;
    this.supportsRightLabel = false;
    this._index = 0;
    this._arrowOnlyOnSelected = false;
    this._items = [];
    this._textWidth = 0;
    this._leftArrow = new Sprite('commonmenu', 'arrowleft', new Point(), new Size(30, 30));
    this._rightArrow = new Sprite('commonmenu', 'arrowright', new Point(), new Size(30, 30));
    this._itemText = new Text(
      '',
      new Point(),
      0.35,
      Color.white,
      Font.ChaletLondon,
      Alignment.Right,
    );
    this.ArrowOnlyOnSelected = arrowOnlyOnSelected;
    this.Items = items;
    this.Index = startIndex;
  }
  get Items() {
    return this._items;
  }
  set Items(value) {
    if (!value) {
      throw new Error("Items can't be null");
    }
    this._items = value;
  }
  get SelectedItem() {
    return this.Items[this.Index];
  }
  set SelectedItem(value) {
    const index = this.Items.findIndex((i) => i.id === value.id);
    if (index >= 0) {
      this.Index = index;
    }
  }
  get SelectedValue() {
    const item = this.SelectedItem;
    return item ? item.value : null;
  }
  get Index() {
    return this._index % this.Items.length;
  }
  set Index(value) {
    if (!this._items.length) {
      return;
    }
    value = value < 0 ? this._items.length - 1 : value > this._items.length - 1 ? 0 : value;
    this._index = value;
    this._textWidth = 0;
  }
  get ArrowOnlyOnSelected() {
    return this._arrowOnlyOnSelected;
  }
  set ArrowOnlyOnSelected(value) {
    this._arrowOnlyOnSelected = value;
  }
  get IsMouseInBoundsOfLeftArrow() {
    return this.parent
      ? this.parent.isMouseInBounds(this._leftArrow.pos, this._leftArrow.size)
      : false;
  }
  get IsMouseInBoundsOfRightArrow() {
    return this.parent
      ? this.parent.isMouseInBounds(this._rightArrow.pos, this._rightArrow.size)
      : false;
  }
  setVerticalPosition(y) {
    const yOffset = y + this.offset.Y + 147;
    this._leftArrow.pos.Y = yOffset;
    this._rightArrow.pos.Y = yOffset;
    this._itemText.pos.Y = yOffset;
    super.setVerticalPosition(y);
  }
  draw() {
    super.draw();
    if (this._textWidth === undefined) {
      const caption = this._getSelectedItemCaption();
      this._itemText.caption = caption;
      this._textWidth = String.measureString(
        caption,
        this._itemText.font,
        this._itemText.scale,
        Menu.screenWidth,
      );
    }
    this._rightArrow.pos.X = this.offset.X + (this.parent ? this.parent.WidthOffset : 0) + 400;
    this._itemText.pos.X = this._rightArrow.pos.X + 5;
    this._itemText.color = this.enabled
      ? this.selected
        ? this.HighlightedForeColor
        : this.ForeColor
      : new Color(255, 163, 159, 148);
    if (this._arrowOnlyOnSelected && !this.selected) {
      this._itemText.pos.X += this._rightArrow.size.width / 2;
    } else {
      this._leftArrow.color = this._itemText.color;
      this._rightArrow.color = this._itemText.color;
      this._leftArrow.pos.X =
        this._itemText.pos.X - this._textWidth - this._leftArrow.size.width + 5;
      this._leftArrow.draw(Menu.screenResolution);
      this._rightArrow.draw(Menu.screenResolution);
    }
    this._itemText.draw(undefined, Menu.screenResolution);
  }
  _getSelectedItemCaption() {
    const item = this.SelectedItem;
    return item ? item.name : '';
  }
}
