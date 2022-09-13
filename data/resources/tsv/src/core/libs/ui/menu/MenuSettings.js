import { InputMode } from '../../index';
import { Control } from '../../enums';
export class MenuSettings {
  constructor() {
    this.scaleWithSafezone = true;
    this.resetCursorOnOpen = true;
    this.mouseControlsEnabled = true;
    this.mouseEdgeEnabled = true;
    this.controlDisablingEnabled = true;
    this.audio = {
      library: 'HUD_FRONTEND_DEFAULT_SOUNDSET',
      upDown: 'NAV_UP_DOWN',
      leftRight: 'NAV_LEFT_RIGHT',
      select: 'SELECT',
      back: 'BACK',
      error: 'ERROR',
    };
    this.enabledControls = {
      [InputMode.GamePad]: [Control.LookUpDown, Control.LookLeftRight, Control.Aim, Control.Attack],
      [InputMode.MouseAndKeyboard]: [
        Control.FrontendAccept,
        Control.FrontendAxisX,
        Control.FrontendAxisY,
        Control.FrontendDown,
        Control.FrontendUp,
        Control.FrontendLeft,
        Control.FrontendRight,
        Control.FrontendCancel,
        Control.FrontendSelect,
        Control.CursorScrollDown,
        Control.CursorScrollUp,
        Control.CursorX,
        Control.CursorY,
        Control.MoveUpDown,
        Control.MoveLeftRight,
        Control.Sprint,
        Control.Jump,
        Control.Enter,
        Control.VehicleExit,
        Control.VehicleAccelerate,
        Control.VehicleBrake,
        Control.VehicleHandbrake,
        Control.VehicleMoveLeftRight,
        Control.VehicleFlyYawLeft,
        Control.VehicleFlyYawRight,
        Control.FlyLeftRight,
        Control.FlyUpDown,
      ],
    };
  }
}
