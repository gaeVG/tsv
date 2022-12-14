import { UIMenuItem } from './';
import { Color, LiteEvent } from '../../../utils';
import { BadgeStyle } from '../../../enums';
export declare class UIMenuSliderItem extends UIMenuItem {
  readonly sliderChanged: LiteEvent;
  readonly sliderSelected: LiteEvent;
  protected supportsRightBadge: boolean;
  protected supportsRightLabel: boolean;
  private _index;
  private _items;
  private _showDivider;
  private _arrowOnlyOnSelected;
  private _leftSliderBadge;
  private _rightSliderBadge;
  private readonly _background;
  private readonly _slider;
  private readonly _divider;
  private readonly _leftArrow;
  private readonly _rightArrow;
  private readonly _leftSliderBadgeSprite;
  private readonly _rightSliderBadgeSprite;
  constructor(
    text: string,
    items: unknown[],
    startIndex?: number,
    description?: string,
    showDivider?: boolean,
    arrowOnlyOnSelected?: boolean,
  );
  get Index(): number;
  set Index(value: number);
  get Item(): unknown;
  get Items(): unknown[];
  set Items(value: unknown[]);
  get ShowDivider(): boolean;
  set ShowDivider(value: boolean);
  get ArrowOnlyOnSelected(): boolean;
  set ArrowOnlyOnSelected(value: boolean);
  get BackgroundColor(): Color;
  set BackgroundColor(value: Color);
  get SliderColor(): Color;
  set SliderColor(value: Color);
  get DividerColor(): Color;
  set DividerColor(value: Color);
  get LeftSliderBadge(): BadgeStyle;
  set LeftSliderBadge(value: BadgeStyle);
  get RightSliderBadge(): BadgeStyle;
  set RightSliderBadge(value: BadgeStyle);
  get IsMouseInBoundsOfLeftArrow(): boolean;
  get IsMouseInBoundsOfRightArrow(): boolean;
  indexToItem(index: number): unknown;
  setVerticalPosition(y: number): void;
  draw(): void;
}
