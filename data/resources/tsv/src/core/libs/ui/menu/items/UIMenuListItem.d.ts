import { LiteEvent } from '../../../utils';
import { ListItem } from '../modules/';
import { UIMenuItem } from './';
export declare class UIMenuListItem extends UIMenuItem {
  readonly listChanged: LiteEvent;
  readonly listSelected: LiteEvent;
  protected supportsRightBadge: boolean;
  protected supportsRightLabel: boolean;
  private _itemText;
  private _leftArrow;
  private _rightArrow;
  private _index;
  private _arrowOnlyOnSelected;
  private _items;
  private _textWidth;
  constructor(
    text: string,
    items: ListItem[],
    startIndex?: number,
    description?: string,
    arrowOnlyOnSelected?: boolean,
  );
  get Items(): ListItem[];
  set Items(value: ListItem[]);
  get SelectedItem(): ListItem;
  set SelectedItem(value: ListItem);
  get SelectedValue(): unknown;
  get Index(): number;
  set Index(value: number);
  get ArrowOnlyOnSelected(): boolean;
  set ArrowOnlyOnSelected(value: boolean);
  get IsMouseInBoundsOfLeftArrow(): boolean;
  get IsMouseInBoundsOfRightArrow(): boolean;
  setVerticalPosition(y: number): void;
  draw(): void;
  private _getSelectedItemCaption;
}
