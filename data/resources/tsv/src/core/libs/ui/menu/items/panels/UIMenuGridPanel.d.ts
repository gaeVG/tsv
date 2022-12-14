import { Point } from '../../../../utils';
import { AbstractUIMenuPanel } from './';
import { Sprite } from '../../../';
export declare class UIMenuGridPanel extends AbstractUIMenuPanel {
  protected readonly background: Sprite;
  private _isCircleLocked;
  private _pressed;
  private _lockXAxis;
  private _lockYAxis;
  private _topText;
  private _leftText;
  private _rightText;
  private _bottomText;
  private _lastCirclePosition;
  private readonly _grid;
  private readonly _circle;
  private readonly _setCirclePosition;
  constructor(
    topText?: string,
    leftText?: string,
    rightText?: string,
    bottomText?: string,
    circlePosition?: Point,
  );
  get TopText(): string;
  set TopText(value: string);
  get LeftText(): string;
  set LeftText(value: string);
  get RightText(): string;
  set RightText(value: string);
  get BottomText(): string;
  set BottomText(value: string);
  get CirclePosition(): Point;
  set CirclePosition(position: Point);
  set CirclePositionX(x: number);
  set CirclePositionY(y: number);
  get LockXAxis(): boolean;
  set LockXAxis(value: boolean);
  get LockYAxis(): boolean;
  set LockYAxis(value: boolean);
  updateParentItem(): void;
  setVerticalPosition(y: number): void;
  draw(): void;
  private _setText;
  private _processControls;
}
